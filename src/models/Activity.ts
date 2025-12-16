import mongoose, { Document, Schema } from "mongoose";

export interface IActivity extends Document {
  type:
    | "course_completed"
    | "project_created"
    | "milestone_achieved"
    | "login"
    | "profile_updated";
  title: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  userId?: mongoose.Types.ObjectId;
}

const ActivitySchema: Schema = new Schema({
  type: {
    type: String,
    enum: [
      "course_completed",
      "project_created",
      "milestone_achieved",
      "login",
      "profile_updated",
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: Map,
    of: Schema.Types.Mixed,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<IActivity>("Activity", ActivitySchema);
