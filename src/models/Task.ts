// src/models/Task.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  type?: string;
  dueDate?: Date | null;
  priority?: "high" | "medium" | "low";
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    // use lowercase 'task' so controller filters match
    type: { type: String, default: "task" },
    dueDate: { type: Date, default: null },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task =
  (mongoose.models && (mongoose.models.Task as mongoose.Model<ITask>)) ||
  mongoose.model<ITask>("Task", TaskSchema);

export default Task;
export { Task };
