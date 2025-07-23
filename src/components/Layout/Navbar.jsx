import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">Film Fanatics</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {user && <li><Link to="/explore">Explore</Link></li>}
        {user && <li><Link to="/clubs">Clubs</Link></li>}
        {user && <li><Link to="/create-club">Create Club</Link></li>}
        {user && <li><Link to="/profile">Profile</Link></li>}
        {!user && <li><Link to="/register">Register</Link></li>}
        {!user && <li><Link to="/login">Login</Link></li>}
      </ul>
      {user && (
       <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
