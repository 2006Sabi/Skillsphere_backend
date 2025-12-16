// src/routes/tasks.ts
import { Router } from "express";
import auth from "../middleware/auth";
import {
  getTasks,
  createTask,
  updateTask,
} from "../controllers/tasksController";

const router = Router();

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.patch("/:id", auth, updateTask);

export default router;
