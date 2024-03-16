import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Card from './Card';
import Navbar from './Navbar';

const Home = () => {
  const cardTypes = ["Cat", "Shuffle", "Cat"];
  const [cards, setCards] = useState([]);
  const [diffuse, setDiffuse] = useState(false);
  const [win, setWin] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const username = localStorage.getItem('username');
  
  const handleStartGame = () => {
    setStartGame(true);
  }

  useEffect(() => {
    const initialDeck = ["Bomb", "Diffuse"];
    while (initialDeck.length < 5) {
      const randomCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      initialDeck.push(randomCard);
    }
    const shuffledDeck = shuffleDeck(initialDeck);
    setCards(shuffledDeck);
  }, []);

  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };
  const handleRestart = () => {
    setCards([]);
    setWin(true);
    setStartGame(false);
    // Resetting the game with initial cards
    const initialDeck = ["Bomb", "Diffuse"];
    while (initialDeck.length < 5) {
      const randomCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      initialDeck.push(randomCard);
    }
    const shuffledDeck = shuffleDeck(initialDeck);
    setCards(shuffledDeck);
  }
  const handleBombClick = () => {
    setWin(false);
    setCards([]);
  };

  const handleShuffleClick = () => {
    const initialDeck = ["Bomb", "Diffuse"];
    while (initialDeck.length < 5) {
      const randomCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      initialDeck.push(randomCard);
    }
    const shuffledDeck = shuffleDeck(initialDeck);
    setCards(shuffledDeck);
  };
  
  const handleCatClick = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };
  useEffect(() => {
  if (win && cards.length === 0 && startGame) {
    handleWin();
  }
  }, [win, cards, startGame]);
  
  const handleWin = () => {
      console.log("Win Game");
      // Send the username to the server when the player wins
      axios.post('http://localhost:8080/win', { username })
        .then(response => {
          console.log('Username sent to server upon winning:', username);
        })
        .catch(error => {
          console.error('Error sending username to server:', error);
        });
  };

  // console.log(cards);
  return (
    <div className='App'>
      <div className='header'>
        <Navbar/>
      </div>
      {!startGame ? (
        <div className='body'>
          <button className='btn-start-game' onClick={() => { handleStartGame(); }}>Start Game!</button>
        </div>
      ) : (
        <div className='body'>
          <h2 style={{ color: 'white', margin: '1rem' }}>Welcome to CATS!</h2>
          <h2 style={{ color: 'white', margin: '1rem' }}>Pick a Card</h2>
          <div className="home">
            {win ? (
              cards.length === 0 ? (
                <h2 style={{ color: 'white', margin: '1rem' }}>You win!</h2>
              ) : (
                cards.map((type, index) => (
                  <Card key={index} index={index} diffuse={diffuse} type={type} setDiffuse={setDiffuse} onBombClick={handleBombClick} onShuffleClick={handleShuffleClick} onCatClick={handleCatClick} />
                ))
              )
            ) : (
              <h2 style={{ color: 'white', margin: '1rem' }}>You Lose</h2>
            )}
            </div>
            <button className='btn-restart-game' onClick={handleRestart}>Restart Game</button>
          </div>
          
      )}
    </div>
  );
}

export default Home;
