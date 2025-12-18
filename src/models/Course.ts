import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  title: String,
  slug: String,
  description: String,
  duration: String,
  difficulty: String,
  externalUrl: String,
  techStack: [String], // Added for Tech Stack
  tags: [String],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default model("Course", CourseSchema);
