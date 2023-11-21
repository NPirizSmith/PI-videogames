import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { createGame, getGenres } from '../../Redux/Actions/actions';

function CreateGame() {
    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres)

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    const [input, setInput] = useState({
        name: "",
        released: "",
        rating: "",
        description: "",
        background_image: "",
        genres: [],
        platforms: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        released: "",
        rating: "",
        description: "",
        background_image: "",
        genres: "",
        platforms: "",
    });

    const containsLetterOrNumber = (str) => {
        return /[a-zA-Z0-9]/.test(str);
    };

    const hasReps = (str) => {
        const repsAllowed = 3;
        const regex = new RegExp(`(.)\\1{${repsAllowed},}`, "g");
        return regex.test(str);
    };

    const hasValidChar = (str) => {
        return /^[a-zA-Z0-9\s\-\:\,\(\)\!\?\&]+$/.test(str);
    };

    const validate = (state, name) => {

        switch (name) {
            case "name":
                if (state.name === "") {
                    setErrors({ ...errors, name: "Campo requerido." });
                } else if (!containsLetterOrNumber(state.name)) {
                    setErrors({ ...errors, name: "Debe contener al menos una letra o número." });
                } else if (hasReps(state.name.toLowerCase())) {
                    setErrors({ ...errors, name: "Nombre incorrecto, evita repiticones." });
                } else if (state.name.trim().length < 3) {
                    setErrors({ ...errors, name: `El nombre debe tener al menos ${3} caracteres.` });
                } else if (state.name.trim().length > 15) {
                    setErrors({ ...errors, name: `El nombre no debe exceder los ${15} caracteres.` });
                } else if (!hasValidChar(state.name)) {
                    setErrors({ ...errors, name: "El campo solo puede contener letras (a-z), números (0-9), espacios y los siguientes caracteres: ( : , () ! ? & )." });
                } else {
                    setErrors({ ...errors, name: "" });
                }
                break;
            case "description":
                if (state.description === "") setErrors({ ...errors, description: "Campo requerido." })
                else setErrors({ ...errors, name: "" })
                break;

        }
    }


    // const allPlatforms = useSelector((state) => state.platforms)


    const handleChange = function (event) {
        const { name, value } = event.target;
        
        if (name === "genres") {
            const selectedGenreId = parseInt(value);
            if (!input.genres.includes(selectedGenreId)) {
                setInput({
                    ...input,
                    genres: [...input.genres, selectedGenreId],
                });
            }
        } else if (name === "rating") {
            setInput({
                ...input,
                [name]: parseFloat(value),
            });
        } else if (name === "platforms") {
            setInput({
                ...input,
                platforms: [...input.platforms, value],
            });
        } else {
            setInput({
                ...input,
                [name]: value,
            });
        }
    };

    // const handleChange = function (event) {
    //     if (event.target.name === "genres") {
    //         setInput({
    //             ...input,
    //             genres: [...input.genres, event.target.value],
    //         });
    //     } else if (event.target.name === "platforms") {
    //         setInput({
    //             ...input,
    //             platforms: [...input.platforms, event.target.value],
    //         });
    //     } else {
    //         setInput({
    //             ...input,
    //             [event.target.name]: event.target.value,
    //         });
    //     }
    //     const updatedInput = {
    //         ...input,
    //         [event.target.name]: event.target.value,
    //     };
    //     setInput(updatedInput);
    //     validate(updatedInput, event.target.name);
    // }

    const removeGenre = (genreId) => {
        setInput({
            ...input,
            genres: input.genres.filter(id => id !== genreId),
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(createGame(input))
        alert('Game created succesfully')
        setInput({
            name: "",
            released: "",
            rating: "",
            description: "",
            background_image: "",
            genres: [],
            platforms: [],
        })
    }




    // function addPlatform(e) {
    //     setplatforms(Array.from(new Set([...platforms, e.target.value])))
    //     seterrors(
    //         validate({
    //             ...input,
    //             genres,
    //             platforms,
    //             [e.target.name]: e.target.value,
    //         })
    //     );
    // }

    return (
        <>
            <div>
                {console.log(input)}
                {console.log(errors)}
                <h2>CREATE GAME</h2>
                <div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <label placeholder='name'>Name:</label>
                        <br />
                        <input
                            name='name'
                            value={input.name}
                            placeholder='Name'
                            type="text"
                            autoComplete="off"
                            onChange={handleChange} />
                        {errors.name && <span>{errors.name}</span>}
                        <br />
                        <label placeholder="description">Description:</label>
                        <br />
                        <textarea
                            name='description'
                            value={input.description}
                            placeholder='Description'
                            cols="30"
                            rows="3"
                            onChange={handleChange} />
                        <br />
                        <label placeholder='Image url'>Image:</label>
                        <br />
                        <input
                            name='background_image'
                            value={input.background_image}
                            placeholder='Url Image'
                            type="text"
                            autoComplete="off"
                            onChange={handleChange} />
                        <br />
                        <label placeholder="date" >Release Date:</label>
                        <br />
                        <input
                            name='released'
                            value={input.released}
                            type="date"
                            required
                            onChange={handleChange} />
                        <br />
                        <label placeholder="rating">Rating:</label>
                        <br />
                        <input
                            name='rating'
                            value={input.rating}
                            placeholder='Rating'
                            type='number'
                            autoComplete="off"
                            onChange={handleChange} />
                        <br />
                        <label>Genres:</label>
                        <div>
                            <select
                                name="genres"
                                value={input.genres[input.genres.length - 1]}
                                onChange={handleChange}
                            >
                                <option disabled value="select">select</option>
                                {genres?.map((genre) => {
                                    return (
                                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                                    )
                                })}
                            </select>
                            <span>
                                <h3>Genres added:</h3>
                                <ul>
                                    {input.genres.map(genreId => {
                                        const selectedGenre = genres.find(genre => genre.id === genreId);
                                        return (
                                            <li key={selectedGenre.id}>
                                                {selectedGenre.name}
                                                <button onClick={() => removeGenre(selectedGenre.id)}>x</button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </span>


                        </div>
                        <br />
                        <label>Platforms:</label>
                        <div>
                            <select
                                name="platforms"
                                value={input.platforms}
                                onChange={handleChange}
                            >
                                <option default value="select">select</option>
                                <option value="PC">PC</option>

                            </select>
                        </div>
                        <div>
                            <button type='submit'>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateGame