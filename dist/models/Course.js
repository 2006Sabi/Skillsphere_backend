"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    title: String,
    slug: String,
    description: String,
    duration: String,
    difficulty: String,
    externalUrl: String,
    techStack: [String], // Added for Tech Stack
    tags: [String],
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("Course", CourseSchema);
