import { Task, TODO, DONE } from "@/types";

export function Top() {
  const tasks: Task[] = [
    {
      id: 1,
      title: "title1",
      status: DONE,
    },
    {
      id: 2,
      title: "title2",
      status: TODO,
    },
    {
      id: 3,
      title: "title3",
      status: DONE,
    },
    {
      id: 4,
      title: "title4",
      status: TODO,
    },
  ];
  return (
    <div>
      <form>
        <div className="flex">
          <input
            name="title"
            value=""
            className="grow mr-4 h-12 p-4 border-soid border border-gray-300 focus:outline-none focus:border-violet-500"
            data-test="input-title"
            placeholder="Add your new todo"
          />
          <button
            data-test="submit"
            className="flex-none submit_btn text-white bg-blue-800"
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
