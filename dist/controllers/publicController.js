"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivities = exports.getRoadmap = exports.getProjects = exports.getCourses = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const Project_1 = __importDefault(require("../models/Project"));
const RoadmapItem_1 = __importDefault(require("../models/RoadmapItem"));
const Activity_1 = __importDefault(require("../models/Activity"));
const getCourses = async (req, res) => {
    const courses = await Course_1.default.find().sort({ createdAt: -1 });
    res.json(courses);
};
exports.getCourses = getCourses;
const getProjects = async (req, res) => {
    const projects = await Project_1.default.find().sort({ createdAt: -1 });
    res.json(projects);
};
exports.getProjects = getProjects;
const getRoadmap = async (req, res) => {
    const items = await RoadmapItem_1.default.find().sort({ order: 1 });
    res.json(items);
};
exports.getRoadmap = getRoadmap;
const getActivities = async (req, res) => {
    try {
        // @ts-ignore
        const activities = await Activity_1.default.find({ userId: req.userId }).sort({
            timestamp: -1,
        });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getActivities = getActivities;
