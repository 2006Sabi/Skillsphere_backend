"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuth_1 = require("../middleware/adminAuth");
const adminController_1 = require("../controllers/adminController");
const router = (0, express_1.Router)();
// Protect all admin routes
router.use(adminAuth_1.adminAuth);
router.get("/users", adminController_1.getAllUsers);
router.put("/users/:id/role", adminController_1.updateUserRole);
router.patch("/users/:id/block", adminController_1.toggleBlockUser);
router.get("/stats", adminController_1.getDashboardStats);
// Course Routes
router.get("/courses", adminController_1.getAllCourses);
router.post("/courses", adminController_1.createCourse);
router.put("/courses/:id", adminController_1.updateCourse);
router.delete("/courses/:id", adminController_1.deleteCourse);
// Project Routes
router.get("/projects", adminController_1.getAllProjects);
router.post("/projects", adminController_1.createProject);
router.put("/projects/:id", adminController_1.updateProject);
router.delete("/projects/:id", adminController_1.deleteProject);
exports.default = router;
