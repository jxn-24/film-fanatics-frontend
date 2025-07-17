import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img src="/image-2.jpeg" alt="Audience in cinema" className="hero-image" />
        <div className="hero-text">
          <h1>Connect with Fellow Film Fanatics</h1>
          <p>
            Join our community of movie & TV series enthusiasts. Discuss, share, and explore your passion for cinema as of 12:36 AM EAT on Friday, July 18, 2025.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Explore the World of Cinema</h2>
        <div className="cards">
          <div className="card">
            <h3>💬 Discover and Discuss</h3>
            <p>Find your next favorite movie or show and share your thoughts with others.</p>
          </div>
          <div className="card">
            <h3>🤝 Connect with Others</h3>
            <p>Engage with fellow film fans and make new friends with similar tastes.</p>
          </div>
          <div className="card">
            <h3>🗣️ Share Your Thoughts</h3>
            <p>Post reviews, leave comments, and join trending conversations.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Dive In?</h2>
        <p>Sign up today and become a part of the Film Fanatics community as of 12:36 AM EAT on Friday, July 18, 2025.</p>
        <button className="btn btn-primary">Join Now</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
        <p>©2024 Film Fanatics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;