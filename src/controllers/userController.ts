// src/controllers/userController.ts
import { Request, Response } from "express";
import path from "path";
import fs from "fs/promises";
import User from "../models/User"; // your TS model default export

// helper type (auth middleware attaches user to req)
interface AuthRequest extends Request {
  user?: any;
}

/**
 * GET /api/users/me
 */
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      console.log("[getMe] Unauthorized: No user in request or missing _id");
      return res.status(401).json({ message: "Controller Unauthorized", user: req.user });
    }
    console.log(`[getMe] Fetching user for ID: ${req.user._id}`);
    const user = await User.findById(req.user._id); // removed select("-password") to debug
    if (!user) {
      console.log("[getMe] User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`[getMe] User found: ${user.username}`); // send safe user object (exclude password if not already excluded)
    const safeUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      city: user.city,
      country: user.country,
      bio: user.bio,
      avatarUrl: user.avatarUrl ?? null,
      skillLevel: user.skillLevel,
      completedProjects: user.completedProjects,
      skills: user.skills,
      completedCourses: user.completedCourses,
      learningStreak: user.learningStreak,
      todayStudyTimeHours: user.todayStudyTimeHours,
      createdAt: user.createdAt,
      updatedAt: (user as any).updatedAt,
    };

    return res.json(safeUser);
  } catch (err: any) {
    console.error("getMe error:", err);
    return res.status(500).json({ message: "Failed to load user" });
  }
};

/**
 * PUT /api/users/me
 * update editable user fields
 */
export const updateMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // Only allow certain fields to be updated
    const allowed: Array<keyof any> = [
      "firstName",
      "lastName",
      "username",
      "email",
      "phone",
      "city",
      "country",
      "bio",
      "skillLevel",
    ];

    const updates: any = {};
    allowed.forEach((k) => {
      if (k in req.body) updates[k] = req.body[k];
    });

    // Prevent username/email changes unless you want them
    // if you want to allow username/email changes, add validation here

    const updated = await User.findByIdAndUpdate(user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    return res.json(updated);
  } catch (err: any) {
    console.error("updateMe error:", err);
    return res
      .status(500)
      .json({ message: "Failed to update profile", error: err.message });
  }
};

/**
 * POST /api/users/me/avatar
 * single file upload form field: "avatar"
 */
export const uploadAvatar = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // multer sets req.file
    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Remove previous avatar file if it exists and is a local path
    if (user.avatarUrl) {
      try {
        // If avatarUrl is stored like "/uploads/filename.jpg"
        if (
          typeof user.avatarUrl === "string" &&
          user.avatarUrl.startsWith("/uploads")
        ) {
          const filePath = path.join(process.cwd(), user.avatarUrl);
          // ensure we don't throw if file missing
          await fs.unlink(filePath).catch(() => { });
        }
      } catch (e) {
        // ignore removal errors
      }
    }

    // Save new avatarUrl (serve statically from /uploads route)
    const avatarUrl = `/uploads/${path.basename(file.path)}`;

    user.avatarUrl = avatarUrl;
    await user.save();

    return res.json({ avatarUrl });
  } catch (err: any) {
    console.error("uploadAvatar error:", err);
    return res.status(500).json({ message: "Failed to upload avatar" });
  }
};

// Alias or re-exports for routes/users.ts compatibility:
export const getProfile = getMe;

// Mock Data source
const ALL_COURSES = [
  { id: "c1", title: "React Basics", description: "Learn the fundamentals of React", totalLessons: 12 },
  { id: "c2", title: "Advanced Node.js", description: "Master backend development", totalLessons: 15 },
  { id: "c3", title: "MongoDB Essentials", description: "Database design and querying", totalLessons: 8 },
  { id: "c4", title: "TypeScript Pro", description: "Type-safe JavaScript at scale", totalLessons: 10 },
  { id: "c5", title: "Full Stack MERN", description: "Build a complete application", totalLessons: 20 },
];

const ALL_PROJECTS = [
  { id: "p1", title: "E-commerce API", description: "RESTful API with payment integration", technologies: ["Node", "Express", "Stripe"] },
  { id: "p2", title: "Task Manager", description: "Drag and drop task board", technologies: ["React", "Redux", "DND"] },
  { id: "p3", title: "Chat Application", description: "Real-time messaging with Socket.io", technologies: ["Socket.io", "React", "Node"] },
  { id: "p4", title: "Portfolio Site", description: "Personal showcase with dark mode", technologies: ["React", "Tailwind"] },
];

const ALL_ROADMAP = [
  { id: "r1", technology: "JavaScript", progress: 100 },
  { id: "r2", technology: "React", progress: 80 },
  { id: "r3", technology: "Node.js", progress: 60 },
  { id: "r4", technology: "MongoDB", progress: 40 },
  { id: "r5", technology: "DevOps", progress: 20 },
];

export const getUserCourses = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.json([]);

    // Map user's completed courses to the full list
    // If we had a real Course model, we would query it here.
    const userCourses = ALL_COURSES.map(course => {
      const isCompleted = user.completedCourses?.includes(course.id) || false;
      return {
        ...course,
        completed: isCompleted,
        progress: isCompleted ? 100 : Math.floor(Math.random() * 90) // Mock progress for uncompleted
      };
    });

    return res.json(userCourses);
  } catch (error) {
    return res.json([]);
  }
};

export const getUserProjects = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.json([]);

    // Use completedProjects count to simulate status
    // In a real app, we'd have a UserProjects collection
    const count = user.completedProjects || 0;

    const userProjects = ALL_PROJECTS.map((project, index) => {
      let status = "planning";
      let progress = 0;

      if (index < count) {
        status = "completed";
        progress = 100;
      } else if (index === count) {
        status = "in-progress";
        progress = 45;
      }

      return {
        ...project,
        status,
        progress
      };
    });

    return res.json(userProjects);
  } catch (error) {
    return res.json([]);
  }
};

export const getUserRoadmap = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.json([]);

    // Personalized roadmap based on skill level?
    // For now, return static list but could depend on user.skillLevel
    const roadmap = ALL_ROADMAP.map(item => ({
      ...item,
      // Add some randomness relative to "user study time" to make it feel dynamic
      progress: Math.min(100, item.progress + (user.learningStreak || 0))
    }));

    return res.json(roadmap);
  } catch (error) {
    return res.json([]);
  }
};

