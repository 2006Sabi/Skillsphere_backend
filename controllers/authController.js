"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, bio, city, country, phone, role } = req.body;
        console.log("Register Request Body:", req.body); // DEBUG LOG
        if (!firstName || !username || !email || !password) {
            const missing = [];
            if (!firstName)
                missing.push('firstName');
            if (!username)
                missing.push('username');
            if (!email)
                missing.push('email');
            if (!password)
                missing.push('password');
            console.log("Missing fields:", missing);
            return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
        }
        const existing = await User_1.default.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            console.log("User exists:", existing.username, existing.email);
            const duplicateField = existing.email === email ? 'email' : 'username';
            return res.status(400).json({ message: `User already exists with this ${duplicateField}` });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hash = await bcryptjs_1.default.hash(password, salt);
        const user = new User_1.default({ firstName, lastName, username, email, password: hash, bio, city, country, phone, role: role || 'user' });
        await user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, firstName: user.firstName, role: user.role } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { usernameOrEmail, password, role } = req.body;
        console.log("Login Request:", { usernameOrEmail, password, role }); // DEBUG LOG
        if (!usernameOrEmail || !password)
            return res.status(400).json({ message: 'Missing credentials' });
        // Case-insensitive search for username or exact match for email
        const user = await User_1.default.findOne({
            $or: [
                { email: usernameOrEmail },
                { username: { $regex: `^${usernameOrEmail}$`, $options: 'i' } }
            ]
        });
        if (!user) {
            console.log("Login User not found:", usernameOrEmail);
            // DEBUG: Returning specific error to frontend to help user debug
            return res.status(400).json({ message: `User not found: ${usernameOrEmail}` });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log("Login Password mismatch for:", usernameOrEmail);
            // DEBUG: Returning specific error to frontend
            return res.status(400).json({ message: 'Incorrect password' });
        }
        // Server-side Role Check
        if (role && user.role !== role) {
            console.log(`Role mismatch: User is '${user.role}' but tried to login as '${role}'`);
            return res.status(403).json({ message: `Access denied. You are not an ${role}.` });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, firstName: user.firstName, role: user.role } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.login = login;
