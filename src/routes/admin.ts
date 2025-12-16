import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth";
import {
    getAllUsers,
    updateUserRole,
    toggleBlockUser,
    getDashboardStats,
    getAllCourses,
    createCourse,
    deleteCourse,
    getAllProjects,
    createProject,
    deleteProject,
} from "../controllers/adminController";

const router = Router();

// Protect all admin routes
router.use(adminAuth);

router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.patch("/users/:id/block", toggleBlockUser);
router.get("/stats", getDashboardStats);

// Course Routes
router.get("/courses", getAllCourses);
router.post("/courses", createCourse);
router.delete("/courses/:id", deleteCourse);

// Project Routes
router.get("/projects", getAllProjects);
router.post("/projects", createProject);
router.delete("/projects/:id", deleteProject);

export default router;
