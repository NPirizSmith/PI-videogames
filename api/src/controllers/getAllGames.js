const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const getAllGames = async (req, res) => {
// busqueda de juegos en la base de datos
  let dbGames = await Videogame.findAll({
    include: Genre
  });
  
  dbGames = dbGames.map(game => ({
    ...game.toJSON(),
    genres: game.genres.map(a => a.name)
  }));
//comprobar si hay petición por query

  if (req.query.name) {
    try {
        //hago la búsqueda en la api
        let response = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}`, 
        {
          params: {
            key: API_KEY,
          },
        });
        if (!response.data.count){
            return res.status(204).json(`No existe un juego que coincida con tu búsqueda: "${req.query.name}"`)
        }
        //si existe el juego entonces obtengo los datos necesarios
        const gameData = response.data.results.map(game => {
            return{
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                rating: game.rating,
                genres: game.genres.map(genre => genre.name),
                released: game.released,
            }
        });
        //hago la búsqueda en la base de datos
        const dbGamesByName = dbGames.filter(game => game.name.toLowerCase().includes(req.query.name.toLowerCase()));
        
        //sumo la búsqueda de los juegos filtrados por nombre de la db y la api
        const results = [...dbGamesByName, ...gameData.splice(0, 15)]; //cap de 15 resultados
        return res.json(results)
    } catch (err) {
        return console.log(err)
    }
}else {
//si no hay data en la query busco todos los juegos de la db y la api
  try {
    let allGames = [...dbGames]; //sumo primero los db games
    let response = await axios('https://api.rawg.io/api/games', {
      params: {
        key: API_KEY,
        page_size: 100,
      },
    });
    
    allGames = [
      ...allGames,
      ...response.data.results.map(game => ({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        genres: game.genres.map(genre => genre.name),
        released: game.released,
      })),
    ]; //a los juegos de la db le sumo los juegos de la api y mapeo solo las props necesarias
    
    
    
    return res.json(allGames);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }};

}
  


module.exports = getAllGames;
