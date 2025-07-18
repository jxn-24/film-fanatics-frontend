import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">Film Fanatics</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/explore">Posts</Link>
          <Link to="/clubs">Clubs</Link>
          <Link to="/create-club">Create Club</Link>
          {/* Removed Create Post link */}
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;