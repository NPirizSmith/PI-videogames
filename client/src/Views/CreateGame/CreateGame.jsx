import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGame, getAllGames, getGenres } from '../../Redux/Actions/actions';
import validations from "./validations/validations"
import style from "./CreateGame.module.css"
import close from "../../assets/close.png"

function CreateGame() {
    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres)
    const allPlatforms = useSelector((state) => state.allPlatforms)
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getAllGames())
        setIsLoading(false); 
    }, [dispatch]);

    const [input, setInput] = useState({
        name: "",
        released: "",
        rating: "",
        description: "",
        background_image: "",
        genres: [],
        platforms: [],
    });

    

    const [nameError, setNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [imageError, setImageError] = useState("");
    const [dateError, setDateError] = useState("");
    const [ratingError, setRatingError] = useState("");

    



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
                rating: parseFloat(value),
            });
        } else if (name === "platforms") {
            const selectedPlatform = value;
            if (!input.platforms.includes(selectedPlatform)) {
                setInput({
                    ...input,
                    platforms: [...input.platforms, selectedPlatform],
                });
                
            }
        } else {
            setInput({
                ...input,
                [name]: value,
            });
        
            const updatedInput = {
                ...input,
                [name]: value,
                
                
            };

            if (name === "platforms") {
                const updatedPlatformsString = input.platforms.join(", ");
                setInput({
                    ...input,
                    platforms: updatedPlatformsString,
                });
            }
            
        
            const errors = validations(updatedInput, name);
            if (name === 'name') {
                setNameError(errors[name]);
            } else if (name === 'description') {
                setDescriptionError(errors[name]);
            } else if (name === 'background_image') {
                setImageError(errors[name]);
            } else if (name === 'released') {
                setDateError(errors[name]);
            } else if (name === 'rating') {
                setRatingError(errors[name]);
            } else if (name === 'genres') {
                setGenresError(errors[name]);
            }
            
        }
    
    };


    const removeGenre = (genreId) => {
        setInput({
            ...input,
            genres: input.genres.filter(id => id !== genreId),
        });
    };

    const removePlatform = (platform) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(item => item !== platform),
        });
    };

    function handleSubmit(e) {
        
        e.preventDefault();
        
        if (nameError || descriptionError || imageError || dateError) {
            alert('Verifica los errores');
        } else {

       
            // console.log(input);
            dispatch(createGame(input));
            alert('Game created!');
            setInput({
                name: "",
                released: "",
                rating: "",
                description: "",
                background_image: "",
                genres: [],
                platforms: "",
            });
        }

       
    }



    return (
        <>
            <div className={style.formContainer}>
                {console.log(allPlatforms)}
                {console.log(input)}
                {console.log("error name:  " + nameError)}
                <h2 className={style.title}>CREATE GAME</h2>
                <div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className={style.nameContainer}>
                        <label placeholder='name'>Name:</label>
                        <br />
                        <input
                            id="name"
                            name='name'
                            value={input.name}
                            placeholder='Name'
                            type="text"
                            autoComplete="off"
                            onChange={handleChange} />
                        </div>
                        <p className={style.error}>{nameError}</p>
                        <div className={style.descriptionContainer}>
                        <label placeholder="description">Description:</label>
                        <br />
                        <textarea
                            id='description'
                            name='description'
                            value={input.description}
                            placeholder='Description'
                            cols="30"
                            rows="3"
                            onChange={handleChange} />
                      </div>
                      <p className={style.error}>{descriptionError}</p>
                      <div className={style.imageContainer}>
                        <label placeholder='Image url'>Image:</label>
                        <br />
                        <input
                            id='background_image'
                            name='background_image'
                            value={input.background_image}
                            placeholder='Url Image'
                            type="text"
                            autoComplete="off"
                            onChange={handleChange} />
                        </div>
                            <p className={style.error} >{imageError}</p>
                        <div className={style.releasedContainer}>
                        <label placeholder="date" >Release Date:</label>
                        <br />
                        <input
                            name='released'
                            value={input.released}
                            type="date"
                            required
                            onChange={handleChange} />
                        </div>
                            <p className={style.error}>{dateError}</p>
                        <div className={style.ratingContainer}>
                        <label placeholder="rating">Rating:</label>
                        <br />
                        <input
                            id='rating'
                            name='rating'
                            value={input.rating}
                            placeholder='Rating'
                            type='number'
                            autoComplete='off'
                            onChange={handleChange}
                            min="1"
                            max="5"
                            step='0.1'  />
                        
                        </div>
                            <p className={style.error} >{ratingError}</p>
                        <div className={style.genresContainer}>
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
                                <ul>
                                    {input.genres.map(genreId => {
                                        const selectedGenre = genres.find(genre => genre.id === genreId);
                                        return (
                                            <li className={style.genres} key={selectedGenre.id}>
                                                {selectedGenre.name}
                                                <img className={style.close} src={close} onClick={() => removeGenre(selectedGenre.id)}></img>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </span>


                        </div>

                        </div>
                        <div className={style.platformsContainer}>
                        <label>Platforms:</label>
                        <div>
                            <select
                                name="platforms"
                                onChange={handleChange}
                            >
                                <option default value="select" disabled="disabled">Add platforms</option>
                                {allPlatforms.map((platform, index) => (
                                    <option key={index} value={platform}>{platform}</option>
                                ))}
                            </select>
                            <div>
                                
                            <ul>
                                {input.platforms.length > 0 && input.platforms.map((platform, index) => (
                                    <li className={style.platforms} key={index}>
                                        {platform}
                                        <img
                                            className={style.close}
                                            src={close}
                                            onClick={() => removePlatform(platform)}
                                            alt="Close"
                                        />
                                    </li>
                                ))}
                            </ul>
                    </div>
                        </div>
                        </div>
                        <div>
                            <button className={style.submit} type='submit'>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateGame