export type Task = {
  question: string;
  answer: string;
  level: number;
  picture?: string;
  cantBeAutoChecked?: boolean;
};

export type TaskDTO = Omit<Task, "answer"> & { id: string };

export type Team = {
  name: string;
  currentTask: number;
  path: number;
  simpleTasks: string[];
  hardTasks: string[];
  score: number;
  gotPointsForCheating: boolean;
};
