import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField,  useMediaQuery, useTheme } from '@material-ui/core';
import Modal from 'react-modal';
import useQuiz from '../hooks/useQuiz';

// Make sure to set appElement to avoid accessibility issue
Modal.setAppElement('#root');

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  console.log({isSmallScreen})

  const {createQuiz} = useQuiz()

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateQuiz = () => {
    // Implement logic to create the quiz
    createQuiz({question,options,answer})
    console.log('Quiz created:', { question, options, answer });
    handleCloseModal();
    setQuestion("")
    setOptions(['', '', '', ''])
    setAnswer("")
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Quiz App</h1>
      <p>
        "The only way to do great work is to love what you do." - Steve Jobs
      </p>
      <div style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: '10px' }}
          onClick={handleOpenModal}
        >
          Create Quiz
        </Button>
        <Link to="/quiz" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            Start Quiz
          </Button>
        </Link>
      </div>

      {/* Modal for creating quiz */}
      <Modal
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            margin: 'auto',
            marginTop: isSmallScreen ? '20px' : '100px',
            width: isSmallScreen ? '70%' : '400px',
            maxWidth: '600px',
            backgroundColor: '#fff',
            padding: '20px',
            paddingTop: '10px',
            borderRadius: '5px',
          },
  
        }}
      >
        <h2>Create Quiz</h2>
        <TextField
          fullWidth
          label="Question"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        {[0, 1, 2, 3].map((index) => (
          <TextField
            key={index}
            fullWidth
            label={`Option ${index + 1}`}
            variant="outlined"
            value={options[index]}
            onChange={(e) => {
              const updatedOptions = [...options];
              updatedOptions[index] = e.target.value;
              setOptions(updatedOptions);
            }}
            style={{ marginBottom: '10px' }}
          />
        ))}
        <TextField
          fullWidth
          label="Correct Answer"
          variant="outlined"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateQuiz}
        >
          Create
        </Button>
      </Modal>
    </div>
  );
};

export default Home;