import { Router } from "express";
import auth from "../middleware/auth";
import {
  getProfile,
  getUserCourses,
  getUserProjects,
  getUserRoadmap,
} from "../controllers/userController";

const router = Router();

router.get("/me", auth, getProfile);
router.get("/courses", auth, getUserCourses);
router.get("/projects", auth, getUserProjects);
router.get("/roadmap", auth, getUserRoadmap);

export default router;
