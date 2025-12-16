import { Schema, model } from "mongoose";

const RoadmapSchema = new Schema({
  title: String,
  slug: String,
  description: String,
  order: Number,
  technology: String,
  completed: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("RoadmapItem", RoadmapSchema);
