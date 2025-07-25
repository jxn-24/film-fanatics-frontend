import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/clubs');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Connect with Fellow Film Fanatics</h1>
        <p>Join our community of movie and TV series lovers. Discover, share, and discuss your passion.</p>
        <button onClick={handleGetStarted}>Get Started</button>
        <div className="footer">
          <p>Explore the World of Cinema</p>
          <p>Discover a platform designed for film lovers, offering a space to connect, discuss, and share your passion for movies and TV series.</p>
          <p>&copy; {new Date().getFullYear()} Film Fanatics. All rights reserved.</p>
        </div>
      </div>
    </div>
    
    
  );
};

export default Landing;