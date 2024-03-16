// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  const username = localStorage.getItem('username');
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="welcome">Welcome, {username}</span>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li><Link to="/rules" className="nav-link">Rules</Link></li>
          <li><Link to="/leaderboard" className="nav-link">Leaderboard</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
