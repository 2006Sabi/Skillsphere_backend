"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Course_1 = __importDefault(require("./models/Course"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";
async function check() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to DB");
        // Check courses
        const count = await Course_1.default.countDocuments();
        console.log(`Courses count: ${count}`);
        if (count > 0) {
            const courses = await Course_1.default.find().limit(2);
            console.log("Sample courses:", JSON.stringify(courses, null, 2));
        }
        else {
            console.log("No courses found. Seed should run on next start.");
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
