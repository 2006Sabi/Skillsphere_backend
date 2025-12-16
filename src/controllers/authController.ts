import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password, bio, city, country, phone, role } = req.body;
    console.log("Register Request Body:", req.body); // DEBUG LOG

    if (!firstName || !username || !email || !password) {
      const missing = [];
      if (!firstName) missing.push('firstName');
      if (!username) missing.push('username');
      if (!email) missing.push('email');
      if (!password) missing.push('password');
      console.log("Missing fields:", missing);
      return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
    }
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      console.log("User exists:", existing.username, existing.email);
      const duplicateField = existing.email === email ? 'email' : 'username';
      return res.status(400).json({ message: `User already exists with this ${duplicateField}` });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ firstName, lastName, username, email, password: hash, bio, city, country, phone, role: role || 'user' });
    await user.save();

    const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, firstName: user.firstName, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password, role } = req.body;
    console.log("Login Request:", { usernameOrEmail, password, role }); // DEBUG LOG

    if (!usernameOrEmail || !password) return res.status(400).json({ message: 'Missing credentials' });

    // Case-insensitive search for username or exact match for email
    const user = await User.findOne({
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

    const isMatch = await bcrypt.compare(password, user.password);
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

    const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, firstName: user.firstName, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
