
import mongoose from 'mongoose';
import User from './models/User';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";
const TOKEN_USER_ID = "6937a19d19493d5e4487dddb";

async function check() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");

        const user = await User.findById(TOKEN_USER_ID);
        if (user) {
            console.log("User FOUND:", user.username, user._id);
        } else {
            console.log("User NOT FOUND with ID:", TOKEN_USER_ID);

            // List all users to see if we have any
            const all = await User.find({}).limit(5);
            console.log("First 5 users in DB:", all.map(u => ({ id: u._id, username: u.username })));
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

check();
