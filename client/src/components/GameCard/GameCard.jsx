import React from 'react';
import { Link } from 'react-router-dom';
import style from './Gamecard.module.css'

const GameCard = ({ game }) => {
  return (
    <div className={style.main}>
      <div className={style.card}>
      <h2>{game.name}</h2>
      <Link to={`/videogame/${game.id}`}>
        <img src={game.background_image} alt={game.name} className={style.img}/>
      </Link>
      <p>{game.rating}</p>
      <p>{game.genres && game.genres.join(', ')}</p>
    </div>
    </div>
  );
};

export default GameCard;
