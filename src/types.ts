export type Task = {
  question: string;
  answers: string[];
  level: number;
  picture?: string;
  cantBeAutoChecked?: boolean;
};

export type TaskDTO = Omit<Task, "answers"> & { id: string };

export type Team = {
  name: string;
  currentTask: number;
  path: number;
  simpleTasks: string[];
  hardTasks: string[];
  score: number;
  gotPointsForCheating: boolean;
};
