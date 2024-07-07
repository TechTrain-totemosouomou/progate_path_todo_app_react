import { Task } from "@/types";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch('/api/tasks');
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const tasks: Task[] = await response.json();
  return tasks;
}
