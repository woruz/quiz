// // models/userResponseModel.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  responses: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    userAnswer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  }],
  feedback: { type: String, required: true }
},{
  timestamps: true
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;