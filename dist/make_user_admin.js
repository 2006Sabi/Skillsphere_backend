"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
dotenv_1.default.config();
const makeUserAdmin = async () => {
    const username = process.argv[2];
    if (!username) {
        console.error("Please provide a username. Usage: npx ts-node src/make_user_admin.ts <username>");
        process.exit(1);
    }
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillsphere";
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to MongoDB");
        const user = await User_1.default.findOne({ username });
        if (!user) {
            console.error(`User '${username}' not found.`);
            process.exit(1);
        }
        user.role = 'admin';
        await user.save();
        console.log(`Successfully updated user '${username}' to role 'admin'.`);
        process.exit(0);
    }
    catch (err) {
        console.error("Error updating user:", err);
        process.exit(1);
    }
};
makeUserAdmin();
