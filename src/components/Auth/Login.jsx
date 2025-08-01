import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAsync } from '../../store/authActions';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await dispatch(loginUserAsync(loginData));
      navigate('/feed');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-overlay">
        <h2>Welcome Back!</h2>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input name="username" type="text" placeholder="Email or Username" required onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
