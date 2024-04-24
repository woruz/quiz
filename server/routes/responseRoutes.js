// routes/userResponseRoutes.js
const express = require('express');
const router = express.Router();
const userResponseController = require('../controllers/responseController');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.post('/', authenticateJWT, userResponseController.submitResponse);
router.get('/', authenticateJWT, userResponseController.getResponses);

module.exports = router;