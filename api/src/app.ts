import cors from "cors";
import {databaseManager} from "@/db/database_manager";
import express from "express";

export const app = express();

app.use(cors());
app.use(express.json());

const statusMap = {
  todo: 0,
  done: 1,
} as const;

type Task = {
  id: number;
  title: string;
  status: (typeof statusMap)[keyof typeof statusMap];
};

const getTasks = async (): Promise<Task[]> => {
  const db = await databaseManager.getInstance();
  return (await db.all(
    "SELECT id, title, status FROM tasks ORDER BY id"
  )) as Task[];
};

const getTask = async (id: number): Promise<Task> => {
  const db = await databaseManager.getInstance();
  return (await db.get(
    "SELECT id, title, status FROM tasks WHERE id = ?",
    id
  )) as Task;
};

app.get("/api/tasks", async (req, res, next) => {
  try {
    res.status(200).json(await getTasks());
  } catch (err) {
    next(err);
  }
});

app.get("/api/tasks/:id", async (req, res, next) => {
  try {
    res.status(200).json(await getTask(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
});

app.post("/api/tasks", async (req, res, next) => {
  try {
    if (!req.is("application/json")) {
      res.status(400).json({
        error: "Invalid request: Content-Type must be 'application/json'",
      });
      return;
    }

    if (!req.body?.title) {
      res.status(400).json({error: "Invalid request: body.title is undefined"});
      return;
    }

    const db = await databaseManager.getInstance();
    const dbObj = await db.run(
      "INSERT INTO tasks(title, status) VALUES (?, ?)",
      req.body.title,
      statusMap.todo
    );
    if (dbObj.lastID === undefined) {
      throw new Error("lastID is undefined");
    }
    res.status(200).json(await getTask(dbObj.lastID));
  } catch (err) {
    next(err);
  }
});

app.post("/api/tasks/:id/done", async (req, res, next) => {
  try {
    const db = await databaseManager.getInstance();
    await db.run(
      "UPDATE tasks SET status = ? WHERE tasks.id = ?",
      statusMap.done,
      req.params.id
    );
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

app.delete("/api/done_tasks", async (req, res, next) => {
  try {
    const db = await databaseManager.getInstance();
    await db.run("DELETE FROM tasks WHERE tasks.status = ?", statusMap.done);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});
