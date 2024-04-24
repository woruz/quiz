import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {loading,login} = useAuth()

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(formData)
    console.log(formData);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={e => onSubmit(e)}>
        <h2>Login</h2>
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
        <div className='login-submit-button'>
          <input type="submit" value="Login" />
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;  