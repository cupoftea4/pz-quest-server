import { readFileSync } from "fs";
import { Task } from "./types";

export const tasks: Record<string, Task> = JSON.parse(
  readFileSync("tasks.json").toString()
) as Record<string, Task>;

const path1 = [
  "1. бібліотека",
  "парк",
  "пам'ятник",
  "студпростір",
  "3 корпус",
  "їдальня",
  "столик",
  "прапори",
  "13 корпус",
  "гк",
  "1 корпус",
  "5 корпус",
];

const path2 = [
  "2. 29 корпус",
  "6 корпус",
  "бандера",
  "львівські круасани",
  "ольги і єлизавети",
  "цирк",
  "2",
  "бібліотека",
  "бухгалтерія",
  "фонтанчик",
  "міст",
  "5 корпус",
];

const path3 = [
  "3. сімка",
  "музей тюрма",
  "органний зал",
  "науково-технічна бібліотека",
  "столик між гк і бібліотекою",
  "підвал 1 корпусу",
  "4 корпус",
  "дерево зламане",
  "4 поверх 1 корпусу",
  "біля кущів біля 1 корпусу",
  "парк біля 29",
  "буфет 5 корпусу",
];

export const hints: Record<number, string[]> = {
  1: path1,
  2: path2,
  3: path3,
};

export const PATH_COUNT = Object.keys(hints).length;

export const TASKS_COUNT = path1.length;
