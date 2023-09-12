import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { TaskDTO } from "./types";
import { TASKS_COUNT, hints, tasks } from "./mock-data";
import cors from "cors";
import { 
  checkAnswer, 
  generateToken, 
  getCurrentTasks, 
  getPointsForCheating, 
  getTeam, 
  hasWon, 
  newTeam, 
  saveTeamChanges, 
  updateTasks, 
  validateTeamName 
} from "./team";
import { existsSync, mkdirSync } from "fs";
import { logAnswer, logWinners } from "./log";

type TaskResponse = {
  tasks: { 
    simple: TaskDTO, 
    hard: TaskDTO 
  },
  score: number,
  currentTask: number,
  status: "playing"
};

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors())
const port = process.env.PORT;

export const LOGS_PATH = "logs";

if (!existsSync('teams')) {
  mkdirSync('teams');
}

if (!existsSync(LOGS_PATH)) {
  mkdirSync(LOGS_PATH);
}

app.get("/gen-tokens/:path", (req: Request, res: Response) => {
  const { path } = req.params;
  const tokens = Object.keys(tasks).map((task) => generateToken(+task, +path) + "." + task);
  res.send(tokens);
});

app.post("/register", (req: Request, res: Response) => {
  const { teamName } = req.body;
  const error = validateTeamName(teamName);

  if (error) {
    return res.status(400).send({ message: error });
  }
  const team = newTeam(teamName);
  saveTeamChanges(team);
  const hint = hints[team.path][0];
  res.send({ message: `Registered ${teamName}!`, path: team.path, hint});
});

app.post("/check-answer", (req: Request, res: Response) => {
  const { teamName, answer, isSimple } = req.body;
  if (!teamName) return res.status(400).send({ message: "No team name!" });
  console.log("Checking answer for " + teamName + " " + answer);
  const team = getTeam(teamName);

  if (checkAnswer(team, answer, isSimple)) {
    const isLastLevel = team.currentTask === TASKS_COUNT;
    team.score += isSimple ? 10 : isLastLevel ? 50 : 20;

    const taskId = isSimple ? team.simpleTasks[team.currentTask - 1] : team.hardTasks[team.currentTask - 1];
    logAnswer(teamName, taskId, answer, team.score);

    if (team.currentTask === TASKS_COUNT) {
      logWinners(teamName, team.score);
      return res.send({ message: "You have won!", score: team.score, status: "won" });
    }
    try {
      updateTasks(team);
    } catch (e) {
      return res.status(500).send({ message: "Something went wrong! " + e});
    }
    const hint = hints[team.path][team.currentTask];
    res.send({ message: "Correct answer!", score: team.score, hint, status: "correct" });
  } else {
    res.send({ message: "Wrong answer!", status: "wrong" });
  }
});

app.post("/skip", (req: Request, res: Response) => { 
  const { teamName } = req.body;
  if (!teamName) return res.status(400).send({ message: "No team name!" });
  console.log("Skipping tasks for " + teamName );
  const team = getTeam(teamName);
  if (team.currentTask === TASKS_COUNT) {
    return res.send({ message: "You have already won!", score: team.score, status: "won" });
  }
  try {
    updateTasks(team);
  } catch (e) {
    return res.status(500).send({ message: "Something went wrong! " + e });
  }
  const hint = hints[team.path][team.currentTask];
  res.send({ hint, status: "skipped", score: team.score });
});

app.post("/:tokenWithTaskNum", (req: Request, res: Response) => {
  const { tokenWithTaskNum } = req.params;
  const [token, task] = tokenWithTaskNum.split(".");
  const { teamName } = req.body;
  if (!teamName) return res.status(400).send({ message: "No team name!" });
  if (!token) return res.status(400).send({ message: "Please scan QR code!" });

  const team = getTeam(teamName);
  if (hasWon(team))
    return res.send({ message: "You already have won!", score: team.score, status: "won" });

  const isCheating = token !== generateToken(+task, team.path);
  if (isCheating) {
    if (getPointsForCheating(team)) {
      return res.send({
        message: "Nice try! You have got 3 points for cheating! Don't do it again!",
        status: "cheated",
        score: team.score,
      });
    }
    return res
      .status(400)
      .send({ message: "You have already got points for cheating!" });
  }
  const isValidToken = generateToken(team.currentTask, team.path) === token;
  if (!isValidToken) {
    return res
      .status(400)
      .send({ message: "Invalid token! Wrong path or task number!" });
  }
  const tasks = getCurrentTasks(team);
  return res.send({
    tasks,
    score: team.score,
    currentTask: team.currentTask,
    status: "playing",
  } satisfies TaskResponse);
});


app.use("/cats_logs", express.static(LOGS_PATH));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
