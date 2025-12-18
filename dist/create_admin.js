"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
dotenv_1.default.config();
const createAdmin = async () => {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to MongoDB");
        const adminEmail = "admin@example.com";
        const existingAdmin = await User_1.default.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("Admin user already exists. Updating role to be sure.");
            existingAdmin.role = 'admin';
            await existingAdmin.save();
            console.log("Admin role enforced.");
        }
        else {
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash("admin123", salt);
            const newAdmin = new User_1.default({
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
    }
    catch (err) {
        console.error("Error creating admin:", err);
        process.exit(1);
    }
};
createAdmin();
