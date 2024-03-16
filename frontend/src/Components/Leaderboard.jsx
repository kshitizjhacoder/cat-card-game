import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const username = localStorage.getItem('username');
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/players'); 
      setLeaderboardData(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh', color: 'white' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Leaderboard!</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '30%',marginBottom:'1vh' }}>
          <span style={{ marginRight: '5rem' }}>Username</span>
          <span>Score</span>
        </div>
        {leaderboardData.map((entry, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', width: '30%',height:'2rem', marginBottom: '1rem' ,backgroundColor: entry.username === username ? 'gray' : 'transparent'}}>
            <span style={{padding:'0.5rem', marginRight: '5rem' }}>{entry.username}</span>
            <span style={{ padding: '0.5rem' }}>{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
