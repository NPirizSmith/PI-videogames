import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { changePage, filterGenre, getAllGames, getGenres, filterByRating, sortAZ, reset } from "../../Redux/Actions/actions";
import GameCards from "../../components/GameCards/GameCards";
import style from './Home.module.css'
import prevArrow from "../../assets/prevArrow.png"
import nextArrow from "../../assets/nextArrow.png"

const Home = () => {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);
    const currentPage = useSelector((state) => state.currentPage);
    const videogames = useSelector((state) => state.filtered);
    
    let totalPages = Math.ceil(videogames.length / 20)
    if(!videogames.length) {
        totalPages = 5
    }   
    
    const [selectedOrigin, setSelectedOrigin] = useState('all');

    const filteredGames = allGames.filter(game => {
        if (selectedOrigin === 'db') {
            return game.isDBGame === true;
        } else if (selectedOrigin === 'api') {
            return game.isDBGame === false;
        }
        return true;
    });

    const pagination = (event) => {
        dispatch(changePage(event.target.name))
    }

    useEffect(() => {

        dispatch(getAllGames())
        dispatch(getGenres())
    }, [dispatch]);

    const handlerReset = () => {
        dispatch(reset())
    }

    const filterByGenre = (event) => {
        dispatch(filterGenre(event.target.value))
    }

    const handleSortChange = (event) => {
        if (event.target.value === 'asc' || event.target.value === 'desc') {
            dispatch(filterByRating(event.target.value));
        }
    }

    const sortAZHandler = (event) => {
        const order = event.target.value;
        if (order === 'asc' || order === 'desc') {
            dispatch(sortAZ(order));
        }
    };

    const handleOriginChange = (event) => {
        setSelectedOrigin(event.target.value);
    };

    return (
        <div className={style.background}>
        <div className={style.main}>
            
            <div className={style.header}>
            <button onClick={handlerReset}>Reset</button>
                <select 
                name="filterByGenre" 
                onChange={filterByGenre}
                className={style.select}
                >
                    <option value="all">Filter by Genre</option>
                    {genres.map((genre) => (
                        <option  key={genre.name} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                <select 
                className={style.select}
                onChange={handleSortChange}>
                    <option  value="">Sort by rating</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <select 
                className={style.select}
                onChange={sortAZHandler}>
                    <option value="">Sort Games</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <select 
                className={style.select}
                onChange={handleOriginChange}>
                    <option value="all">All Games</option>
                    <option value="db">Local Games</option>
                    <option value="api">API Games</option>
                </select>
                <div className={style.pagination}>
              
                    <img onClick={pagination} name="prev" src={prevArrow}></img>
             
                <h3>Page {currentPage + 1} - {totalPages}</h3>
    
                <img onClick={pagination} name="next" src={nextArrow}></img>

            </div>
            </div>
            <div className={style.container}>
            <GameCards videogames={filteredGames} />
            </div>
        </div>
        </div>
        
    )
};

export default Home;
