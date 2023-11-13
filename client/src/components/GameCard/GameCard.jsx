import React from 'react'
import { Link } from 'react-router-dom'

const GameCard = ({ id, name,  background_image, rating, genres }) => {

    return (
      <div key={id}>
        <h2>{name}</h2>
        <Link to={`/videogame/${id}`}>
          <img src={background_image} alt={name} />
        </Link>
        <p>{rating}</p>
        <p>{genres}</p>
      </div>
    );
  };
  
  export default GameCard;
  