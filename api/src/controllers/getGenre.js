const axios = require('axios');
const { Genre } = require('../db');

const getAllGenres = async (req, res) => {
  try {
    const { API_KEY } = process.env;

    let genres = await Genre.findAll();

    if (genres.length === 0) {
      
      const response = await axios.get('https://api.rawg.io/api/genres', {
        params: {
          key: API_KEY,
        },
      });

      if (response.data && response.data.results) {

        const genreNames = response.data.results.map((genre) => genre.name);

        genres = await Genre.bulkCreate(
          genreNames.map((name) => ({ name })),
          { returning: true }
        );
      }
    }

    res.json(genres);
  } catch (error) {
    console.error('Error al obtener los géneros:', error);
    res.status(500).json({ message: 'Error al obtener los géneros' });
  }
};

module.exports = getAllGenres;
