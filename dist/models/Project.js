"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    techStack: [String],
    difficulty: String,
    duration: String,
    status: {
        type: String,
        enum: ["planning", "in-progress", "completed", "paused"],
        default: "planning",
    },
    progress: { type: Number, default: 0 },
    technologies: [String],
    steps: [{
            title: String,
            description: String,
            order: Number,
            isCompleted: { type: Boolean, default: false }
        }],
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("Project", ProjectSchema);
