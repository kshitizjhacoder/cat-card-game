// Rules.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Rules.css';
const Rules = () => {
  return (
    <div className="rule-page">
      <div className="back-button">
        <Link to="/home" className="btn-back">Back</Link>
      </div>
      <div className="center">
        <h2>Understand Kitten Card</h2>
      </div>
      <div className="rules">
        <h3>Rules</h3>
        <ul>
          <li>If the card drawn from the deck is a cat card, then the card is removed from the deck.</li>
          <li>If the card is exploding kitten (bomb) then the player loses the game.</li>
          <li>If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</li>
          <li>If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</li>
        </ul>
      </div>
    </div>
  );
};

export default Rules;
