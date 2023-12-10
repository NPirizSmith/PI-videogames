import React from 'react';
import { Link } from 'react-router-dom';
import style from './Gamecard.module.css'
import defaultImage from '../../assets/defaultImage.jpg'
import star from '../../assets/star.png'

const GameCard = ({ game }) => {

  const backgroundImage = game.background_image || defaultImage;

  return (
    <div className={style.main}>
      <Link className={style.img} to={`/videogame/${game.id}`}>
        <img src={backgroundImage} alt={game.name} />
      </Link>
      <h2 className={style.title}>{game.name}</h2>
      <div className={style.data}>
      <p>{game.genres && game.genres.join(', ')}</p>
      </div>
      <div className={style.ratingStar}><img src={star}></img></div>
      <p className={style.rating}>{game.rating}</p>
    </div>
  );
};
export default GameCard;
