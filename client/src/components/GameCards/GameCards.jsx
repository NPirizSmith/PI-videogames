import React from 'react';
import GameCard from '../GameCard/GameCard';
import style from './Gamecards.module.css';

const GameCards = ({ videogames }) => {
  return (
    <div className={style.container}>
      {videogames &&
        videogames.map((game) => (
          <div key={game.id} className={style.card}>
            <GameCard game={game} />
          </div>
        ))}
    </div>
  );
};

export default GameCards;
