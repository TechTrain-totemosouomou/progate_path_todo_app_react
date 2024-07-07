import { Task } from "@/types";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const tasks: Task[] = await response.json();
  return tasks;
}

export async function addTask(title: string): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to add task");
  }

  const task: Task = await response.json();
  return task;
}

export async function markTaskAsDone(taskId: number): Promise<void> {
  const response = await fetch(`/api/tasks/${taskId}/done`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to mark task as done");
  }
}

export async function clearAllDoneTasks(): Promise<void> {
  const response = await fetch("/api/done_tasks", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to clear done tasks");
  }
}
