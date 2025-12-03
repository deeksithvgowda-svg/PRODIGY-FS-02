// src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new administrator
// @access  Public (Only needed to create the *first* admin, then should be restricted)
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);


// You can optionally add a route to check the current user's token validity:
// @route   GET /api/auth/user
// @desc    Get logged in user details
// @access  Private (Requires a valid token)
// router.get('/user', require('../middleware/auth'), authController.getLoggedInUser);


module.exports = router;
