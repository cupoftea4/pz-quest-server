import { appendFile } from "fs";
import { LOGS_PATH } from ".";
import path from "path";

export const logAnswer = (
  teamName: string,
  taskId: string,
  answer: string,
  score: number
) => {
  const logEntry = `[${new Date().toISOString()}] ${teamName} ${taskId} "${answer}" ${score}\n`;

  const logPath = path.join(LOGS_PATH + "/answers.log");

  appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error(`Error while trying to log: ${err}`);
    }
  });
};

export const logWinners = (teamName: string, score: number) => {
  const logEntry = `[${new Date().toISOString()}] ${teamName} ${score}\n`;

  appendFile(path.join(LOGS_PATH + "/winners.log"), logEntry, (err) => {
    if (err) {
      console.error(`Error while trying to log: ${err}`);
    }
  });
};
