const { Videogame } = require('../db'); 
const createGame = async (req, res) => {
  try {
    const { name, description, platforms, background_image, released, rating, genres } = req.body;


const [newVideogame, created] = await Videogame.findOrCreate({
  where: {
    name,
    description,
    released,
    background_image,
    rating,
    platforms,
  }
});

if (created) {
  await newVideogame.setGenres(genres);
}

res.status(201).json(newVideogame); 
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el videojuego' });
  }
};

module.exports = createGame;