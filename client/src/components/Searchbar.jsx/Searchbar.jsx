import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchGame } from '../../Actions/index';

const SearchBar = () => {

    const dispatch = useDispatch();

    const [state, setState] = useState("");

    const handleChange = (e) => {
        setState(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchGame(state))
    }

    return (
        <div>
            <form>
                <input onChange={handleChange} type="text" />
                <button onClick={handleSubmit} type="submit">Buscar</button>
            </form>
        </div>
    )
}

export default SearchBar;