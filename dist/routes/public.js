"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/public.ts
const express_1 = require("express");
const publicController_1 = require("../controllers/publicController");
const auth_1 = __importDefault(require("../middleware/auth")); // ✅ IMPORT auth middleware properly
const router = (0, express_1.Router)();
router.get("/courses", publicController_1.getCourses);
router.get("/projects", publicController_1.getProjects);
router.get("/roadmap", publicController_1.getRoadmap);
// Protected route – requires login
router.get("/activities", auth_1.default, publicController_1.getActivities);
exports.default = router;
