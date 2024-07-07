export const TODO = 0;
export const DONE = 1;

export type TaskStatus = typeof TODO | typeof DONE;

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};
