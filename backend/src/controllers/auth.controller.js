import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
    // Handle user signup logic here
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        };
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        };
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        };
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword });
        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
            return res.status(201).json({ _id: savedUser._id, fullName: savedUser.fullName, email: savedUser.email, profilePic: savedUser.profilePic, message: 'User registered successfully' });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Internal Server error' });
    }
};

export const login = (req, res) => {
    // Handle user login logic here
    res.send('Login endpoint');
};

export const logout = (req, res) => {
    // Handle user logout logic here
    res.send('Logout endpoint');
};  