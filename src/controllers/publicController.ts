import { Request, Response } from "express";
import Course from "../models/Course";
import Project from "../models/Project";
import RoadmapItem from "../models/RoadmapItem";
import Activity from "../models/Activity";

export const getCourses = async (req: Request, res: Response) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
};

export const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

export const getRoadmap = async (req: Request, res: Response) => {
  const items = await RoadmapItem.find().sort({ order: 1 });
  res.json(items);
};

export const getActivities = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const activities = await Activity.find({ userId: req.userId }).sort({
      timestamp: -1,
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
