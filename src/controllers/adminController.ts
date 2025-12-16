import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course"; // Assuming you have this
import Project from "../models/Project"; // Assuming you have this

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update user role
export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true }
        ).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Toggle user block status
export const toggleBlockUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"}`, user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Dashboard Stats
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCourses = await Course.countDocuments();
        const totalProjects = await Project.countDocuments();

        res.json({
            totalUsers,
            totalCourses,
            totalProjects,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// --- Course Management ---

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find().populate("userId", "username");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// --- Project Management ---

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find().populate("userId", "username");
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
