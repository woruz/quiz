import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {loading,register} = useAuth()

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // Handle form submission (e.g., register user)
    register(formData)
    console.log({formData});
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={e => onSubmit(e)}>
        <h2>Register</h2>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className='register-submit-button'>
          <input type="submit" value="Register" />
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;