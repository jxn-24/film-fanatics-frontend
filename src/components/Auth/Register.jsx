// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

    const newUser = {
      username: name,
      email,
      password,
      avatar
    };

    dispatch(registerUser(newUser));
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      navigate('/clubs');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-green" style={{ width: '100%' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
