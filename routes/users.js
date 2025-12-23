"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get("/me", auth_1.default, userController_1.getProfile);
router.get("/courses", auth_1.default, userController_1.getUserCourses);
router.get("/projects", auth_1.default, userController_1.getUserProjects);
router.get("/roadmap", auth_1.default, userController_1.getUserRoadmap);
exports.default = router;
