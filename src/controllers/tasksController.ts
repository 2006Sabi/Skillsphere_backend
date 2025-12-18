// src/controllers/tasksController.ts
import { Request, Response } from "express";
import Task from "../models/Task"; // <-- use Task model

/**
 * GET /api/tasks
 * Returns tasks for the authenticated user (from Task collection).
 */
export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId =
      (req as any).user?.id ?? (req as any).user?._id ?? (req as any).userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch tasks belonging to the user (type = "task")
    const tasks = await Task.find({
      userId,
      type: "task",
    })
      .sort({ completed: 1, dueDate: 1, createdAt: -1 })
      .lean();

    return res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return res.status(500).json({ message: "Failed to load tasks" });
  }
};

/**
 * POST /api/tasks
 * Create a new task stored in the Task collection.
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const userId =
      (req as any).user?.id ?? (req as any).user?._id ?? (req as any).userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, dueDate, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      userId,
      title,
      type: "task",
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: priority ?? "medium",
      status: "todo", // Default new tasks to todo
      completed: false,
    });

    return res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err);
    return res.status(500).json({ message: "Failed to create task" });
  }
};

/**
 * PATCH /api/tasks/:id
 * Update task fields (status/completed/priority/dueDate/title)
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id ?? (req as any).user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Task id required" });

    const updates: any = {};
    if (req.body.status !== undefined) updates.status = req.body.status;
    if (typeof req.body.completed === "boolean")
      updates.completed = req.body.completed;
    if (req.body.priority) updates.priority = req.body.priority;
    if (req.body.dueDate !== undefined)
      updates.dueDate = req.body.dueDate ? new Date(req.body.dueDate) : null;
    if (req.body.title) updates.title = req.body.title;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (err) {
    console.error("Error updating task", err);
    return res.status(500).json({ message: "Failed to update task" });
  }
};
