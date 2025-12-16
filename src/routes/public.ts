// src/routes/public.ts
import { Router } from "express";
import {
  getCourses,
  getProjects,
  getRoadmap,
  getActivities,
} from "../controllers/publicController";
import auth from "../middleware/auth"; // ✅ IMPORT auth middleware properly

const router = Router();

router.get("/courses", getCourses);
router.get("/projects", getProjects);
router.get("/roadmap", getRoadmap);

// Protected route – requires login
router.get("/activities", auth, getActivities);

export default router;
