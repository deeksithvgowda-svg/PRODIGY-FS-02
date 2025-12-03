// src/controllers/authController.js

const User = require('../models/User'); // Import the User Model
const jwt = require('jsonwebtoken');     // Used to create the token

// @desc    Register a new administrator
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    // Get username and password from the request body
    const { username, password } = req.body;

    try {
        // Check if the user already exists (by username)
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new User instance (Mongoose pre-save hook handles password hashing)
        user = new User({
            username,
            password
            // Role defaults to 'admin' in the model
        });

        await user.save();
        
        // After successful registration, we immediately log them in by creating a JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Sign the token (uses the secret key from .env)
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during registration');
    }
};


// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Check if the user exists
        let user = await User.findOne({ username });
        if (!user) {
            // Use generic message for security
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 2. Compare the entered password with the hashed password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 3. If credentials match, create and return JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during login');
    }
};
