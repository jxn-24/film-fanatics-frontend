import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserAsync } from '../../store/authActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUserAsync());
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">Film Fanatics</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/clubs">Clubs</Link>
          <Link to="/clubs/create">Create Club</Link>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
