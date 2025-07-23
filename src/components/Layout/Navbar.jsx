import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar styled-navbar">
      <div className="container navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', backgroundColor: 'white' }}>

        <div className="logo-title" style={{ fontSize: '24px', fontWeight: 'bold', color: '#1b5e20' }}>
          Film Fanatics
        </div>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/" className="nav-link-box">Home</Link>
          <Link to="/clubs" className="nav-link-box">Clubs</Link>
          <Link to="/create-club" className="nav-link-box">Create Club</Link>
          <Link to="/explore" className="nav-link-box">Explore</Link>

          {!user ? (
            <>
              <Link to="/login" className="nav-link-box">Login</Link>
              <Link to="/register" className="nav-link-box">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-link-box">Profile</Link>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#1b5e20',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
              <div className="avatar-circle">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                  alt={user.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #2e7d32',
                    marginLeft: '8px'
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
