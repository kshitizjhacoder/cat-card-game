import React, { useState } from 'react';

const Card = ({ type, setDiffuse, diffuse, index, onBombClick, onShuffleClick, onCatClick }) => {
  // console.log(type);
  // console.log(win, len, SG);
  const [flipped, setFlipped] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const handleClick = () => {
    console.log(diffuse);
    setFlipped(true);
    if (type === "Cat") {
      setTimeout(() => {
        setFlipped(false);
        setLeaving(true);
      }, 500);
      setTimeout(() => {
        onCatClick(index);
        setLeaving(false);
      }, 1500);
    } else if (type === "Shuffle") {
      setTimeout(() => {
        setFlipped(false);
      }, 500);
      setTimeout(() => {
        onShuffleClick();
      }, 1000);
    } else if (type === "Bomb") {
      if (!diffuse) {
        console.log(diffuse);
        setTimeout(() => {
          onBombClick();
          setDiffuse(false);
        }, 1500);
      }
      else {
        setTimeout(() => {
          setFlipped(false);
          setTimeout(() => {
            onCatClick(index);
          }, 300);
        }, 500);
      }
    } else if (type === "Diffuse") {
      setDiffuse(true);
      setTimeout(() => {
        setFlipped(false);
        setTimeout(() => {
          onCatClick(index);
        }, 300);
      }, 500);
    }
    else if (type === null || type.length === 0) {
      console.log("nUll type")
      return (
        <div className="flip-card">
          <h2>You lose</h2>
        </div>
      );
    }
  }
  let description;
  if (type === "Bomb") {
    description = "https://media.istockphoto.com/id/842671590/vector/cartoon-bomb-illustration.jpg?s=1024x1024&w=is&k=20&c=5hNsD7IVomc3SubrFt1HY4n_h8MDgLt_89Tg2qTKi44=";
  } else if(type === "Shuffle" ) {
    description = "https://media.istockphoto.com/id/681014776/vector/cartoon-image-of-shuffle-icon.jpg?s=612x612&w=0&k=20&c=_onkKZXROE_Z0MAN_bsb1AMgvBS78BEB8Knay_7E14s=";
  } else if (type === "Cat") {
    description = "https://media.istockphoto.com/id/1097490360/vector/vector-illustration-of-cute-black-cat.jpg?s=612x612&w=0&k=20&c=Ef0qYl79aZJ6NJXJVbJ0onjXVNnSyqrN_TKPjieAIGE=";
  } else if (type === "Diffuse") {
    description = "https://www.shutterstock.com/shutterstock/photos/1178901484/display_1500/stock-vector-bomb-squad-expert-defusing-bomb-1178901484.jpg";
  }
  
  return (
    <div className={`flip-card ${flipped ? 'flipped' : ''} ${leaving ? 'leaving' : ''} `} onClick={handleClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={`https://media.istockphoto.com/id/1215168597/vector/vector-illustration-happy-cat-simple-mascot-style.jpg?s=1024x1024&w=is&k=20&c=BVRTiBr1R7k-RDUI3bPQxxprmIEHc-NStBr2a8UxIVw=`} alt="Cat" />
        </div>
        <div className="flip-card-back">
          <h1>{type}</h1>
          <img style={{width:'10vw'}} src={description} alt={type} />
        </div>
      </div>
    </div>
  );
};

export default Card;
