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
<nav className="header">
  <div className="navbar-container">
    <Link to="/" className="brand">
      <span className="brand-text">Film Fanatics</span>
    </Link>
    <div className="nav-links">
      {user ? (
        <>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/explore" className="nav-link">Explore</Link>
          <Link to="/clubs" className="nav-link">Clubs</Link>
          <Link to="/clubs/create" className="nav-link">Create Club</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <button onClick={handleLogout} className="btn-logout nav-link">Logout</button>
        </>
      ) : (
        <>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </>
      )}
    </div>
  </div>
</nav>
  );
};

export default Navbar;
