
import mongoose from 'mongoose';
import Course from './models/Course';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";

async function check() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");

        // Check courses
        const count = await Course.countDocuments();
        console.log(`Courses count: ${count}`);

        if (count > 0) {
            const courses = await Course.find().limit(2);
            console.log("Sample courses:", JSON.stringify(courses, null, 2));
        } else {
            console.log("No courses found. Seed should run on next start.");
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

check();
