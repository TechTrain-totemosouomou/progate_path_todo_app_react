import React, { useEffect, useState } from 'react';
import { Task, TODO, DONE } from "@/types";
import { getTasks, addTask } from "@/api";

export function Top() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
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
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
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
      <TaskList tasks={tasks} />
      <div className="text-gray-500 hover:text-gray-400 text-right text-lg mt-4 mb-6">
        <button type="button" data-test="clear_btn">
          clear all done tasks
        </button>
      </div>
    </div>
  );
}

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul data-test="tasks">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} />
        </li>
      ))}
    </ul>
  );
}

function TaskItem({ task }: { task: Task }) {
  return (
    <div className="flex border-b text-2xl p-6">
      <div className="flex-none">
        {task.status === TODO ? (
          <div className="task_btn" />
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
