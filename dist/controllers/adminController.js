"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.updateCourse = exports.deleteProject = exports.createProject = exports.getAllProjects = exports.deleteCourse = exports.createCourse = exports.getAllCourses = exports.getDashboardStats = exports.toggleBlockUser = exports.updateUserRole = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Course_1 = __importDefault(require("../models/Course")); // Assuming you have this
const Project_1 = __importDefault(require("../models/Project")); // Assuming you have this
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select("-password");
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getAllUsers = getAllUsers;
// Update user role
const updateUserRole = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select("-password");
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.updateUserRole = updateUserRole;
// Toggle user block status
const toggleBlockUser = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isBlocked = !user.isBlocked;
        await user.save();
        res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"}`, user });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.toggleBlockUser = toggleBlockUser;
// Get Dashboard Stats
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User_1.default.countDocuments();
        const totalCourses = await Course_1.default.countDocuments();
        const totalProjects = await Project_1.default.countDocuments();
        res.json({
            totalUsers,
            totalCourses,
            totalProjects,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getDashboardStats = getDashboardStats;
// --- Course Management ---
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course_1.default.find().populate("userId", "username");
        res.json(courses);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getAllCourses = getAllCourses;
const createCourse = async (req, res) => {
    try {
        const newCourse = new Course_1.default(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.createCourse = createCourse;
const deleteCourse = async (req, res) => {
    try {
        await Course_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Course deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.deleteCourse = deleteCourse;
// --- Project Management ---
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project_1.default.find().populate("userId", "username");
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getAllProjects = getAllProjects;
const createProject = async (req, res) => {
    try {
        const newProject = new Project_1.default(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.createProject = createProject;
const deleteProject = async (req, res) => {
    try {
        await Project_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.deleteProject = deleteProject;
// Update Course
const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true } // Return the updated document
        );
        if (!updatedCourse)
            return res.status(404).json({ message: "Course not found" });
        res.json(updatedCourse);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.updateCourse = updateCourse;
// Update Project
const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject)
            return res.status(404).json({ message: "Project not found" });
        res.json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.updateProject = updateProject;
