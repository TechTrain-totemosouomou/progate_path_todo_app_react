import React, { useEffect, useState } from "react";
import { Task, TODO, DONE } from "@/types";
import { getTasks, addTask, markTaskAsDone, clearAllDoneTasks } from "@/api";

export function Top() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await addTask(newTaskTitle.trim());
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleMarkTaskAsDone = async (taskId: number) => {
    try {
      await markTaskAsDone(taskId);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: DONE } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const handleClearAllDoneTasks = async () => {
    try {
      await clearAllDoneTasks();
      setTasks(tasks.filter((task) => task.status !== DONE));
    } catch (error) {
      console.error("Error clearing done tasks:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <div className="flex">
          <input
            name="title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="grow mr-4 h-12 p-4 border-soid border border-gray-300 focus:outline-none focus:border-violet-500"
            data-test="input-title"
            placeholder="Add your new todo"
          />
          <button
            data-test="submit"
            className="flex-none submit_btn text-white bg-blue-800"
            type="submit"
          />
        </div>
      </form>
      <TaskList tasks={tasks} onTaskDone={handleMarkTaskAsDone} />
      <div className="text-gray-500 hover:text-gray-400 text-right text-lg mt-4 mb-6">
        <button
          type="button"
          data-test="clear_btn"
          onClick={handleClearAllDoneTasks}
        >
          clear all done tasks
        </button>
      </div>
    </div>
  );
}

function TaskList({
  tasks,
  onTaskDone,
}: {
  tasks: Task[];
  onTaskDone: (taskId: number) => void;
}) {
  return (
    <ul data-test="tasks">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} onTaskDone={onTaskDone} />
        </li>
      ))}
    </ul>
  );
}

function TaskItem({
  task,
  onTaskDone,
}: {
  task: Task;
  onTaskDone: (taskId: number) => void;
}) {
  const handleTaskDone = () => {
    if (task.status === TODO) {
      onTaskDone(task.id);
    }
  };

  return (
    <div className="flex border-b text-2xl p-6">
      <div className="flex-none">
        {task.status === TODO ? (
          <div className="task_btn" onClick={handleTaskDone} />
        ) : (
          <div className="task_btn done" />
        )}
      </div>
      <div className="grow flex pl-8" data-test="task-title">
        {task.title}
      </div>
    </div>
  );
}
