import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const makeUserAdmin = async () => {
    const username = process.argv[2];

    if (!username) {
        console.error("Please provide a username. Usage: npx ts-node src/make_user_admin.ts <username>");
        process.exit(1);
    }

    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        const user = await User.findOne({ username });

        if (!user) {
            console.error(`User '${username}' not found.`);
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`Successfully updated user '${username}' to role 'admin'.`);
        process.exit(0);

    } catch (err) {
        console.error("Error updating user:", err);
        process.exit(1);
    }
};

makeUserAdmin();
