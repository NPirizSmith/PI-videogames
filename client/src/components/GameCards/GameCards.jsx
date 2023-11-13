import React from 'react'
import GameCard from '../GameCard/GameCard'
// import {useSelector} from "react-redux";


const GameCards = ({ videogames }) => {
  return(
    <div>
        {videogames.map(games=>{
            return <GameCard
            key={games.id}
            id={games.id}
            name={games.name}
            image={games.background_image}
            released={games.released}
            rating={games.rating}
            />
        })}
    </div>
)

}

export default GameCards;