// controllers/userResponseController.js
const Response = require("../models/Response");
const OpenAI = require("openai");
// const compromise = require('compromise');

exports.submitResponse = async (req, res) => {
  const postData = req.body;
  let score = 0
  let max_score = 0
  const openai = new OpenAI({ apiKey: process.env.apiKey });
  let bodyArr = [];

  for (let key in postData) {
    let obj = {};
    obj.questionId = key;
    obj.userAnswer = postData[key].split("_")[0];
    obj.isCorrect = postData[key].split("_")[1] === postData[key].split("_")[0];
    if(postData[key].split("_")[1] === postData[key].split("_")[0]){
      score = score + 1
      max_score = max_score + 1
    }else{
      max_score = max_score + 1
    }
    bodyArr.push(obj);
  }

  const feedback = await generateFeedback(score,max_score);
  const userResponse = new Response({
    userId: req.user.id,
    responses: bodyArr,
    feedback: feedback
  });

  try {
    const newUserResponse = await userResponse.save();
    res
      .status(201)
      .json({ success: true, response: "Response submited!!!" /*feedback*/ });
  } catch (err) {
    console.log({ err });
    res.status(400).json({ success: false, response: "Something went wrong" });
  }
};

exports.getResponses = async (req, res) => {
  try {
    const responses = await Response.find({ userId: req.user.id });

    // Populate the responses with the details of the questions from the Quiz model
    await Response.populate(responses, {
      path: "responses.questionId",
      model: "Quiz",
    });

    res.status(200).json({ success: true, response: responses });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ success: false, response: "Something went wrong" });
  }
};

async function generateFeedback(score) {
  try {
    const prompt = `Based on your quiz score of ${score}, here's some feedback:`;
    const response = await openai.completions.create({
      // engine: 'davinci', // You can adjust the engine as needed
      prompt,
      model: "davinci-002",
      max_tokens: 50, // Adjust based on your desired length of feedback
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    return "Failed to generate feedback. Please try again later.";
  }
}
