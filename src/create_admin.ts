import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const createAdmin = async () => {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        const adminEmail = "admin@example.com";
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin user already exists. Updating role to be sure.");
            existingAdmin.role = 'admin';
            await existingAdmin.save();
            console.log("Admin role enforced.");
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("admin123", salt);

            const newAdmin = new User({
                username: "admin",
                email: adminEmail,
                password: hashedPassword,
                firstName: "System",
                lastName: "Admin",
                role: "admin",
                bio: "I am the super admin",
            });

            await newAdmin.save();
            console.log("Admin user created successfully.");
            console.log("Email: admin@example.com");
            console.log("Password: admin123");
        }

        process.exit(0);
    } catch (err) {
        console.error("Error creating admin:", err);
        process.exit(1);
    }
};

createAdmin();
