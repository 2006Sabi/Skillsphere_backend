"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const upload_1 = require("../middleware/upload");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// GET current user
router.get("/me", auth_1.default, userController_1.getMe);
// UPDATE profile (PUT)
router.put("/me", auth_1.default, userController_1.updateMe);
// UPLOAD avatar (multipart/form-data) -> field name "avatar"
router.post("/me/avatar", auth_1.default, upload_1.upload.single("avatar"), userController_1.uploadAvatar);
exports.default = router;
