import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchGameByName } from "../../Redux/Actions/actions";
import GameCards from "../GameCards/GameCards";

export default function Search() {
  const dispatch = useDispatch();
  let { name } = useParams()

  const searchGame = useSelector((state) => state.filtered);

  useEffect(() => {
    try {
      dispatch(searchGameByName(name));
    } catch (error) {
      console.error("Error during search:", error);
    }
  }, [dispatch, name]);
  

  return (
    <div>
      <h1>{name}</h1>
      {searchGame.length > 0 ? (
        <GameCards videogames={searchGame} />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
      }
  