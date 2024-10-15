import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import backgroundVideo from './videos/background_video.mp4';

const HomePage = () => {
  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showFeatures, setShowFeatures] = useState(false); // New state for features list
  const navigate = useNavigate();

  const handleFormOpen = (formType) => {
    setShowForm(formType);
    setMessage('');
  };

  const handleCloseForm = () => {
    setShowForm(null);
    setFormData({ email: '', password: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email: formData.email,
        password: formData.password,
      });
      setMessage(res.data.msg);
      if (res.status === 200) {
        navigate('/main');
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/signup', {
        email: formData.email,
        password: formData.password,
      });
      setMessage(res.data.msg);
      if (res.status === 200) {
        handleFormOpen('login'); // Show login form after successful signup
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Signup failed');
    }
  };

  const toggleFeaturesList = () => {
    setShowFeatures((prev) => !prev); // Toggle the visibility of features
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Mood Tunes</div>
        <ul className="nav-links">
          <li><button onClick={toggleFeaturesList} className="nav-link">Features</button></li>
          <li><button onClick={() => handleFormOpen('login')} className="nav-link">Login</button></li>
          <li><button onClick={() => handleFormOpen('signup')} className="nav-link">Sign Up</button></li>
        </ul>
      </nav>

      {/* Hero Section with Video Background */}
      <div className="hero">
        <video autoPlay muted loop className="hero-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Welcome to Mood Tunes</h1>
          <p>Discover music that matches your mood.</p>
          <button onClick={() => handleFormOpen('login')} className="hero-btn">Get Started</button>
        </div>
      </div>

      {/* Conditional Login/Signup Forms */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <button className="close-btn" onClick={handleCloseForm}>×</button>
            {showForm === 'login' && (
              <div className="form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" required />
                  <button type="submit" className="form-btn">Login</button>
                </form>
                <p id="txt">Don't have an account? <span id="l_s" onClick={() => handleFormOpen('signup')}>Sign Up</span></p>
                {message && <p className="message">{message}</p>}
              </div>
            )}
            {showForm === 'signup' && (
              <div className="form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" required />
                  <button type="submit" className="form-btn">Sign Up</button>
                </form>
                <p id="txt">Already have an account? <span id="l_s" onClick={() => handleFormOpen('login')}>Login</span></p>
                {message && <p className="message">{message}</p>}
              </div>
            )}
          </div>
        </div>
      )}

     {/* Features List */}
{showFeatures && (
  <div className="features-list">
    <ul>
      <li>Mood-Based Song Recommendations</li>
      <li>Facial Expression Analysis</li>
      <li>Custom playlists based on your preferences</li>
      <li>Seamless Spotify Integration</li>
    </ul>
  </div>
)}


      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Mood Tunes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
