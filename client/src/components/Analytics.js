import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useResponse from '../hooks/useResponse';

const Analytics = () => {
  const { data } = useResponse();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // Prepare data for the chart
  const chartData = data ? {
    labels: data.map(test => new Date(test.createdAt).toLocaleDateString()), // Extract test dates for x-axis
    datasets: [{
      label: 'Test Score',
      data: data.map(test => test.responses.filter(response => response.isCorrect).length), // Calculate test scores for y-axis
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1
    }]
  } : null;

  // Chart options
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Test Date'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Score'
        }
      }
    }
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: 'Chart.js Line Chart',
  //     },
  //   },
  // };

  return (
    <div>
      <h2>Test Scores Over Time</h2>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default Analytics;