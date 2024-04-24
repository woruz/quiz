// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.get('/', authenticateJWT, quizController.getAllQuizzes);
router.post('/', authenticateJWT, quizController.createQuiz);

module.exports = router;