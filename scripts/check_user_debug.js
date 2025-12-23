"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";
const TOKEN_USER_ID = "6937a19d19493d5e4487dddb";
async function check() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to DB");
        const user = await User_1.default.findById(TOKEN_USER_ID);
        if (user) {
            console.log("User FOUND:", user.username, user._id);
        }
        else {
            console.log("User NOT FOUND with ID:", TOKEN_USER_ID);
            // List all users to see if we have any
            const all = await User_1.default.find({}).limit(5);
            console.log("First 5 users in DB:", all.map(u => ({ id: u._id, username: u.username })));
        }
    }
    catch (err) {
        console.error("Error:", err);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
check();
