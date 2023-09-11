import { appendFile } from "fs";

export const logAnswer = (
  teamName: string,
  taskId: string,
  answer: string,
  score: number
) => {
  const logEntry = `[${new Date().toISOString()}] ${teamName} ${taskId} "${answer}" ${score}\n`;

  appendFile("answers.log", logEntry, (err) => {
    if (err) {
      console.error(`Error while trying to log: ${err}`);
    }
  });
};

export const logWinners = (teamName: string, score: number) => {
  const logEntry = `[${new Date().toISOString()}] ${teamName} ${score}\n`;

  appendFile("winners.log", logEntry, (err) => {
    if (err) {
      console.error(`Error while trying to log: ${err}`);
    }
  });
};
