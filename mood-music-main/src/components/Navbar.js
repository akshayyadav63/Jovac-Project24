import React from 'react';
import './Navbar.css'; // Importing the CSS file
import { FaUserCircle } from 'react-icons/fa'; // User profile icon

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* User Profile Section */}
      <div className="user-profile">
        <FaUserCircle className="user-icon" />
        <span className="user-name">User Name</span>
      </div>

      {/* Options Section */}
      <div className="options">
        <button className="option-btn">Profile</button>
        <button className="option-btn">Logout</button>
        <button className="option-btn">Settings</button>
      </div>
    </nav>
  );
};

export default Navbar;
