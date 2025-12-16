// src/server.ts
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import authRoutes from "./routes/auth";
import publicRoutes from "./routes/public";
import compilerRoutes from "./routes/compiler";
import tasksRouter from "./routes/tasks";
import userRoutes from "./routes/userRoutes"; // updated user route (avatar + profile updates)
import adminRoutes from "./routes/admin";

import seed from "./seed";

dotenv.config();

const app = express();

// security & parsing middlewares
app.use(helmet());
app.set('etag', false); // Disable ETags to prevent 304 responses
// configure CORS to allow your front-end origin (adjust as needed)
app.use(
  cors({
    origin: true, // Allow any origin dynamically
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------
// ✅ STATIC UPLOADS ROUTE
// ---------------------------
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ---------------------------
// API ROUTES (mount specific routes BEFORE generic /api)
// ---------------------------

// Auth routes
app.use("/api/auth", authRoutes);

// User routes (specific)
app.use("/api/users", userRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Tasks routes (must be mounted before a generic /api router)
app.use("/api/tasks", tasksRouter);

// Compiler (specific)
app.use("/api/compiler", compilerRoutes);

// Generic/public API routes (catch-all under /api)
// Keep this last among /api routes so it doesn't shadow specific ones
app.use("/api", publicRoutes);

// ---------------------------
// DATABASE + SERVER START
// ---------------------------
const PORT = Number(process.env.PORT || 5000);
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // optional seed - you can comment this out in production
    await seed();

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
