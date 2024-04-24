// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    authController.registerUser
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.loginUser);

module.exports = router;