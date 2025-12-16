// src/routes/userRoutes.ts
import { Router } from "express";
import auth from "../middleware/auth";
import { upload } from "../middleware/upload";
import { getMe, updateMe, uploadAvatar } from "../controllers/userController";

const router = Router();

// GET current user
router.get("/me", auth, getMe);

// UPDATE profile (PUT)
router.put("/me", auth, updateMe);

// UPLOAD avatar (multipart/form-data) -> field name "avatar"
router.post("/me/avatar", auth, upload.single("avatar"), uploadAvatar);

export default router;
