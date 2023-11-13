const axios = require('axios');
const { Videogame, Genre, game_genre } = require('../db');

const getGamesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { API_KEY } = process.env;

    console.log(id);
    
    if(isNaN(id)) {
        const dbGame = await Videogame.findByPk(id, {
      include: {
        model: Genre,
        attributes: ["name"],
      },
    });
    if (dbGame) {
      return res.json(dbGame);
    }
    }
  
    const response = await axios(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: API_KEY,
      },
    });
    let { name, background_image, genres, description, released: releaseDate, rating, platforms } = response.data;
    genres = genres.map(g => g.name);
    platforms = platforms.map(p => p.platform.name); 
    game= ({
        id,
        name,
        background_image,
        genres,
        description,
        releaseDate,
        rating,
        platforms
    })
    return res.status(200).json(game);
  } catch (error) {
    console.error('Error al obtener el detalle del videojuego:', error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = getGamesById;