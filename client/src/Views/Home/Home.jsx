import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { changePage, filterGenre, getAllGames, getGenres, filterByRating, sortAZ } from "../../Redux/Actions/actions";
import GameCards from "../../components/GameCards/GameCards";
import style from './Home.module.css'

const Home = () => {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);
    const currentPage = useSelector((state) => state.currentPage);
    const fullVideogames = useSelector((state) => state.fullVideogames);

    const totalPages = Math.ceil(fullVideogames.length / 20);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    
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

    const handlePageClick = (page) => {
        dispatch(changePage(page - 1));
    };

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
            <h3>currentPage: {currentPage + 1}</h3>
            <div>
                <button onClick={pagination} name="prev">
                    prev
                </button>
                {pageNumbers.map((page) => (
                    <button key={page} onClick={() => handlePageClick(page)}>
                        {page}
                    </button>
                ))}
                <button onClick={pagination} name="next">
                    next
                </button>
            </div>
            <div>
                <select name="filterByGenre" onChange={filterByGenre}>
                    {genres.map((genre) => (
                        <option key={genre.name} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                <select onChange={handleSortChange}>
                    <option value="">Sort by rating</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <select onChange={sortAZHandler}>
                    <option value="">Sort Games</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <select onChange={handleOriginChange}>
                    <option value="all">All Games</option>
                    <option value="db">Local Games</option>
                    <option value="api">API Games</option>
                </select>
            </div>
            <div className={style.container}>
            <GameCards videogames={filteredGames} />
            </div>
        </div>
    )
};

export default Home;
