import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
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
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default model("Project", ProjectSchema);
