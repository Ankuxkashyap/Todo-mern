import express from 'express';
import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.post('/singup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User .findOne({ email }); 
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: false, // Set to true in production
            sameSite: 'lax',// this is store the cooKie in the browser that is very importent 
        });
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/logout', isAuthenticated, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
});

router.get('/me', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID.",
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});


export default router;