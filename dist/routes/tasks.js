"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/tasks.ts
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const tasksController_1 = require("../controllers/tasksController");
const router = (0, express_1.Router)();
router.get("/", auth_1.default, tasksController_1.getTasks);
router.post("/", auth_1.default, tasksController_1.createTask);
router.patch("/:id", auth_1.default, tasksController_1.updateTask);
exports.default = router;
