import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Paper, makeStyles } from '@material-ui/core';
import useQuiz from '../hooks/useQuiz';
import useResponse from '../hooks/useResponse';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  questionContainer: {
    margin: 'auto',
    marginTop: '20px',
    padding: '20px',
    maxWidth: '600px',
    backgroundColor: '#fafafa', // Paper-like background color
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Shadow effect
  },
}));

const Quiz = () => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isAllAnswered, setIsAllAnswered] = useState(false);
  const navigate = useNavigate();

  const {createResponse} = useResponse()

  const { quiz } = useQuiz();
  useEffect(() => {
    setQuestions(quiz);
  }, [quiz]);

  // Update answers state when an option is selected
  const handleAnswerChange = (questionId, answer,correct_answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: `${answer}_${correct_answer}`,
    }));
  };

  // Check if all questions are answered
  useEffect(() => {
    const allAnswered = questions.every(question => answers[question._id]);
    setIsAllAnswered(allAnswered);
  }, [answers, questions]);

  // Submit function
  const handleSubmit = () => {
    // Do something with the answers, like sending them to the server
    console.log('Answers:', answers);

    createResponse(answers)
    navigate('/results');
  };

  return (
    <div className={classes.questionContainer}>
      {questions.map(question => {
        console.log({question})
        return (
        <Paper key={question._id} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <h3>{question.question}</h3>
          <h3>{question.correctAnswer}</h3>
          <FormControl component="fieldset">
            <RadioGroup
              value={answers[question._id]}
              onChange={e => handleAnswerChange(question._id, e.target.value,question.correctAnswer)}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      )})}
      <Button
        variant="contained"
        color="primary"
        disabled={!isAllAnswered || !questions.length}
        onClick={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Quiz;