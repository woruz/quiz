// controllers/quizController.js
const Quiz = require('../models/Quiz');

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json({success: true, response: quizzes});
  } catch (err) {
    res.status(500).json({success: false, response: err.message });
  }
};

exports.createQuiz = async (req, res) => {
  const quiz = new Quiz({
    question: req.body.question,
    options: req.body.options,
    correctAnswer: req.body.answer,
  });

  try {
    const newQuiz = await quiz.save();
    res.status(201).json({success: true, response: "New question created!!!"});
  } catch (err) {
    res.status(400).json({ success: false, response: "Something went wrong"});
  }
};