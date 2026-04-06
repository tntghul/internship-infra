const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    const secret = process.env.JWT_SECRET || "secretkey";
    console.log("Generating token for id:", id, "with secret:", secret);
    return jwt.sign({ id }, "secretkey", { expiresIn: '30d' });
};

// Signup
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            success: true,
            message: "User registered successfully",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
};

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                success: true,
                message: "Login successfully",
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
};

module.exports = { registerUser, loginUser };