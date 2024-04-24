import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useResponse from '../hooks/useResponse';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    marginTop: '20px',
    padding: '20px',
    maxWidth: '800px',
    backgroundColor: '#fafafa', // Paper-like background color
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Shadow effect
  },
}));

const Results = () => {
  const classes = useStyles();
  const [results, setResults] = useState([]);

  const {data} = useResponse()
  useEffect(() => {
    // Fetch results for the current user from your API
    if(data && data.length){
      setResults(data.reverse())
    }
  }, [data]);

  console.log({results})

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return (
    <Paper className={classes.paper}>
      <h2>Results</h2>
      {results && results.length ? results.map(result => (
        <Accordion key={result._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`result-${result._id}-content`}
            id={`result-${result._id}-header`}
          >
            <Typography>{`Result of test taken on ${new Date(result.createdAt.toLocaleString('en-GB', options))}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {/* Display result details */}
              {/* You can customize this to display the information you want */}
              Total Questions: {result.responses.length}<br />
              Quiz ID: {result.responses.filter(response => response.isCorrect === true).length}<br />
              Percentage Score: {(result.responses.filter(response => response.isCorrect === true).length/result.responses.length*100).toFixed(2)}%
              {/* Add more details as needed */}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )) : ""}
    </Paper>
  );
};

export default Results;