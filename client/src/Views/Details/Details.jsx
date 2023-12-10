import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getGamesById, clearDetail } from '../../Redux/Actions/actions';
import { useParams } from 'react-router-dom';
import style from './Details.module.css'
import Stars from '../../components/starsRating/starsRating';

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((store) => store.gameById);

  useEffect(() => {
      dispatch(getGamesById(id))
      return () => {
        dispatch(clearDetail());
      };
  }, [dispatch, id]); 


  return (
    <div className={style.container}>
      <div className={style.header}>
        <img src={game.background_image} />
      </div>
      <div className={style.headerData}>
        <h1>{game.name}</h1>
        <h2>Released: {game.releaseDate}</h2>
        <h3>ID: {game.id}</h3>
      </div>
        <Stars className={style.rating} rating={game.rating} />
      <div className={style.imgContainer}>
        <img
          src={game.background_image}
          alt={game.name}
          />
      </div>
      <div className={style.genresContainer}>
    <h3>
      <Link to={game.stores}><button>Buy</button></Link>
      Genre:
      {game.genres &&
        game.genres.map((genre) => (
          <span key={genre.id} className={style.genres}>
            {genre.name}
          </span>
        ))}
    </h3>
    </div>
    <div className={style.platformsContainer}>
       <h3>
      Platforms:
      {game.platforms &&
        game.platforms.map((platform) => (
          <span key={platform.id} className={style.platforms}>
            {platform}
          </span>
        ))}
    </h3>
    </div>
 <div className={style.descriptionContainer}>
 <h3>Description: {" "}</h3><p>{game.description && game.description.replace(/<[^>]*>/g, '')}</p>
 </div>
   
    </div>
  )
}

export default Details