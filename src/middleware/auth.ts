// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export interface AuthRequest extends Request {
  user?: any;
}

export default async function auth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log(`[AUTH] Request to ${req.path}, Token present: ${!!token}`);

    if (!token) {
      console.log("[AUTH] No token provided");
      throw new Error("No token provided");
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Fetch full user object from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({ message: "Auth Middleware Error", error: (err as any).message });
  }
}
