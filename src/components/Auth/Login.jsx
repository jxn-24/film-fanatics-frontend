import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    identifier: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
    navigate('/feed');
  };

  

  return (
    <div className="auth-form">
      <div className="auth-overlay">
        <h2>Welcome Back!</h2>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input name="identifier" type="text" placeholder="Email or Username" required onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;