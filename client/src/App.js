import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Feedback from './components/Feedback';
import Analytics from './components/Analytics';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar';
import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (you can implement your own logic here)
    const userLoggedIn = localStorage.getItem('loggedIn');
    console.log({userLoggedIn})
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Router>
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn}/>
      <div className="app">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login"/>} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/quiz" element={isLoggedIn ? <Quiz /> : <Navigate to="/login"/>} />
          <Route path="/results" element={isLoggedIn ? <Results /> : <Navigate to="/login"/>} />
          <Route path="/analytics" element={isLoggedIn ? <Analytics /> : <Navigate to="/login"/>} />
          <Route path="/feedback" element={isLoggedIn ? <Feedback /> : <Navigate to="/login"/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
