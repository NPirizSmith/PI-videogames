import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllGames } from "../../Actions";
import GameCards from "../../components/GameCards/GameCards";
import Pagination from "../../components/Pagination/Pagination";
// import SearchBar from "./SearchBar";

const Home =() => {

    const dispatch = useDispatch();

    const allGames = useSelector((state)=>state.videogames);

    useEffect(()=> {
        dispatch(getAllGames())
    }, [dispatch]);

    return (
        <div>
            <h1>Videogames</h1>
            <GameCards allGames={allGames}/>
        </div>
        )
};


export default Home;