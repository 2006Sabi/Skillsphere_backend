"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const public_1 = __importDefault(require("./routes/public"));
const compiler_1 = __importDefault(require("./routes/compiler"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // updated user route (avatar + profile updates)
const admin_1 = __importDefault(require("./routes/admin"));
const seed_1 = __importDefault(require("./seed"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// security & parsing middlewares
app.use((0, helmet_1.default)());
app.set('etag', false); // Disable ETags to prevent 304 responses
// configure CORS to allow your front-end origin (adjust as needed)
app.use((0, cors_1.default)({
    origin: true, // Allow any origin dynamically
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ---------------------------
// ✅ STATIC UPLOADS ROUTE
// ---------------------------
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// ---------------------------
// API ROUTES (mount specific routes BEFORE generic /api)
// ---------------------------
// Auth routes
app.use("/api/auth", auth_1.default);
// User routes (specific)
app.use("/api/users", userRoutes_1.default);
// Admin routes
app.use("/api/admin", admin_1.default);
// Tasks routes (must be mounted before a generic /api router)
app.use("/api/tasks", tasks_1.default);
// Compiler (specific)
app.use("/api/compiler", compiler_1.default);
// Generic/public API routes (catch-all under /api)
// Keep this last among /api routes so it doesn't shadow specific ones
app.use("/api", public_1.default);
// ---------------------------
// DATABASE + SERVER START
// ---------------------------
const PORT = Number(process.env.PORT || 5000);
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";
mongoose_1.default
    .connect(MONGO_URI)
    .then(async () => {
    console.log("✅ Connected to MongoDB");
    // optional seed - you can comment this out in production
    await (0, seed_1.default)();
    app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running at http://localhost:${PORT}`));
})
    .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
});
