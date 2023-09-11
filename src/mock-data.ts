import { readFileSync } from "fs";
import { Task } from "./types";

export const PATH_COUNT = 3;
export const TASKS_COUNT = 3;

export const tasks: Record<string, Task> = JSON.parse(
  readFileSync("tasks.json").toString()
) as Record<string, Task>;

const path1Hints = ["1. Hint 1", "1. Hint 2", "1. Hint 3"];

const path2Hints = ["2. Hint 1", "2. Hint 2", "2. Hint 3"];

const path3Hints = ["3. Hint 1", "3. Hint 2", "3. Hint 3"];

export const hints: Record<number, string[]> = {
  1: path1Hints,
  2: path2Hints,
  3: path3Hints,
};
