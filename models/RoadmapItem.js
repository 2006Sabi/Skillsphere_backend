"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoadmapSchema = new mongoose_1.Schema({
    title: String,
    slug: String,
    description: String,
    order: Number,
    technology: String,
    completed: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.default = (0, mongoose_1.model)("RoadmapItem", RoadmapSchema);
