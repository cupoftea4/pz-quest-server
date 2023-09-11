import { readFileSync, readdirSync, writeFile } from "fs";
import { compareToHash, generateHash } from "./general";
import { Task, TaskDTO, Team } from "./types";
import { PATH_COUNT, TASKS_COUNT, tasks } from "./mock-data";
import fs from 'fs';

export const newTeam = (teamName: string): Team => {
  const tasksIds = Object.keys(tasks);
  return {
    name: teamName,
    currentTask: 1,
    path: Math.ceil(Math.random() * PATH_COUNT),
    simpleTasks: [generateNewSimpleTask(tasksIds)],
    hardTasks: [generateNewHardTask(tasksIds)],
    score: 0,
    gotPointsForCheating: false,
  } satisfies Team;
};

export const checkAnswer = (data: Team, answer: string, isSimple: boolean): boolean => {
  const userTasks = isSimple ? data.simpleTasks : data.hardTasks;
  const currentTask = tasks[userTasks[data.currentTask - 1]];
  console.log("Checking answer for " + data.name + " " + answer, currentTask.answer);
  return currentTask.cantBeAutoChecked || compareToHash(generateHash(currentTask.answer), answer.toLowerCase());
};

export const hasWon = (data: Team): boolean => {
  return data.currentTask === TASKS_COUNT;
};

export const logAnswer = (teamName: string, taskId: number, answer : string, score: number) => {
  const logEntry = `[${new Date().toISOString()}] name: ${teamName} taskId: ${taskId} answer: ${answer} totalScore: ${score}\n`;
  
  fs.appendFile("AnswersLog.txt", logEntry,  (err)=>{
    if (err) {
      console.error(`Error while trying to log: ${err}`);
    }
  });
}

export const logWinners = (teamName: string, score: number) => {
  const logEntry = `[${new Date().toISOString()}] name: ${teamName} finalScore: ${score}\n`;
  
  fs.appendFile("WinnersLog.txt", logEntry,  (err)=>{
    if (err) {
      console.error(`Error while trying to log: ${err}`);
    }
  });
}

export const getCurrentTasks = (data: Team): { simple: TaskDTO, hard: TaskDTO} => {
  const taskIndex = data.currentTask - 1;
  const simpleTaskId = data.simpleTasks[taskIndex];
  const hardTaskId = data.hardTasks[taskIndex];
  const simpleTaskDTO = toTaskDTO(tasks[simpleTaskId], simpleTaskId);
  const hardTaskDTO = toTaskDTO(tasks[hardTaskId], hardTaskId);
  return { simple: simpleTaskDTO, hard: hardTaskDTO };
};

export const getTeam = (teamName: string): Team => {
  const data = readFileSync(teamFile(teamName));
  const team = JSON.parse(data.toString()) as Team;
  return team;
};

export const saveTeamChanges = (data: Team) => {
  const newData = new Uint8Array(Buffer.from(JSON.stringify(data)));
  return new Promise((resolve, reject) => {
    console.log("Saving changes to " + teamFile(data.name));
    writeFile(teamFile(data.name), newData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Success");
      }
    });
  });
};

export const getPointsForCheating = (data: Team) => {
  if (data.gotPointsForCheating) {
    return false;
  }
  data.gotPointsForCheating = true;
  data.score += 3;
  saveTeamChanges(data);
  return true;
};

export const generateToken = (taskNumber: number, path: number) => {
  const token = generateHash(`${taskNumber}|${path}`);
  return token;
};

export const toTaskDTO = (data: Task, id: string) => {
  return {
    id,
    question: data.question,
    picture: data.picture,
    level: data.level,
    cantBeAutoChecked: data.cantBeAutoChecked,
  } satisfies TaskDTO;
};

export const updateTasks = (data: Team) => {
  if (
    data.currentTask !== data.simpleTasks.length ||
    data.currentTask !== data.hardTasks.length
  ) {
    data.simpleTasks.length = data.currentTask;
    data.hardTasks.length = data.currentTask;
    throw new Error("Something went wrong!");
  }
  const newTeam = newWithNextTask(data);
  saveTeamChanges(newTeam);
  return newTeam;
};

export const getAllTeams = () => {
  const files = readdirSync("./teams");
  const teams = files.map((file) => file.split(".")[0]);
  return teams;
};

export const validateTeamName = (teamName: string) => {
  if (!teamName) {
    return "Team name is required!";
  }
  if (getAllTeams().includes(teamName)) {
    return "Team name is already taken!";
  }

  if (teamName.length > 20) {
    return "Team name is too long!";
  }

  if (teamName.length < 3) {
    return "Team name is too short!";
  }

  if (!/^[a-zA-Z0-9]+$/.test(teamName)) {
    return "Team name can only contain letters and numbers!";
  }
};

const newWithNextTask = (oldTeam: Team) => {
  const newTeam = { ...oldTeam };
  const oldTasks = [...oldTeam.simpleTasks, ...oldTeam.hardTasks];
  const difference = Object.keys(tasks)
    .filter((x) => !oldTasks.includes(x));

  newTeam.simpleTasks.push(generateNewSimpleTask(difference));
  newTeam.hardTasks.push(generateNewHardTask(difference, newTeam.currentTask === TASKS_COUNT - 1));
  newTeam.currentTask++;

  return newTeam;
};

const generateNewSimpleTask = (difference: string[]) => {
  const simpleTasksLeft = difference.filter(taskId => tasks[taskId].level === 1);
  const newSimpleTask = simpleTasksLeft[Math.floor(Math.random() * simpleTasksLeft.length)];
  if (newSimpleTask === undefined) {
    throw Error("Failed to generate new simple task");
  }
  return newSimpleTask;
}

const generateNewHardTask = (difference: string[], isLast?: boolean) => {
  const hardTasksLeft = difference.filter(taskId => tasks[taskId].level > (isLast ? 2 : 1));
  const newHardTask = hardTasksLeft[Math.floor(Math.random() * hardTasksLeft.length)];
  if (newHardTask === undefined) {
    throw Error("Failed to generate new hard task");
  }
  return newHardTask;
}

const teamFile = (teamName: string) => `./teams/${teamName}.json`; 