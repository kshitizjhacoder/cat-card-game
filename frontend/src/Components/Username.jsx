import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Username = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    // Navigate to /home and pass the username as state
    localStorage.setItem('username', username);
    navigate('/home');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh', color: 'white' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Welcome to Kitten Card Game</h1>
      <div>
        <label htmlFor="usernameInput">Create a username:</label>
        <br />
        <input
          type="text"
          id="usernameInput"
          value={username}
          onChange={handleInputChange}
          style={{ padding: '10px', borderRadius: '5px', border: 'none' }}
        />
      </div>
      <br />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#FFA500',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Username;
