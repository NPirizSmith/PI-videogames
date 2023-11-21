import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getGamesById } from '../../Redux/Actions/actions';
import { useParams } from 'react-router-dom';


function Details() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const game = useSelector((store) => store.gameById);

    useEffect(() => {
      console.log('ID:', id);
      if (id) {
        dispatch(getGamesById(id)) ;
      }
    }, [dispatch, id]);

    console.log(game)

    return (
        <div>
          <Link to="/home"><button>Home</button></Link>
          <p>{game.id}</p>
          <h2>{game.name}</h2>
          <img src={game.background_image} alt={game.name}/>
          <h3>{game.rating}</h3>
          <h3>{game.genres && game.genres.join(', ')}</h3>
          <h3>{game.platforms && game.platforms.join(', ')}</h3>
          <p>{game.description}</p>
        </div>
  )
}

export default Details