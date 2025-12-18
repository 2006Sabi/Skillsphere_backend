"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
async function auth(req, res, next) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        console.log(`[AUTH] Request to ${req.path}, Token present: ${!!token}`);
        if (!token) {
            console.log("[AUTH] No token provided");
            throw new Error("No token provided");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        // Fetch full user object from DB
        const user = await User_1.default.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // Attach user to request
        req.user = user;
        next();
    }
    catch (err) {
        console.error("AUTH ERROR:", err);
        return res.status(401).json({ message: "Auth Middleware Error", error: err.message });
    }
}
