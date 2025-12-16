import { Schema, model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  city?: string;
  country?: string;
  phone?: string;

  // NEW FIELDS ⬇⬇⬇
  role?: "user" | "admin";
  isBlocked?: boolean;
  avatarUrl?: string; // profile picture
  skillLevel?: "Beginner" | "Intermediate" | "Advanced";
  completedProjects?: number;

  skills?: string[];
  completedCourses?: string[];
  learningStreak?: number;
  todayStudyTimeHours?: number;

  createdAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
