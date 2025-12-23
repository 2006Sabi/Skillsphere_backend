"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String,
    city: String,
    country: String,
    phone: String,
    /** NEW FIELDS */
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },
    avatarUrl: { type: String, default: null },
    skillLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },
    completedProjects: {
        type: Number,
        default: 0,
    },
    skills: [String],
    completedCourses: [String],
    learningStreak: { type: Number, default: 0 },
    todayStudyTimeHours: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
