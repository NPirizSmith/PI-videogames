const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const getAllGames = async (req, res) => {
  let dbGames = await Videogame.findAll({
    include: Genre,
  });

  dbGames = dbGames.map((game) => ({
    ...game.toJSON(),
    genres: game.genres.map((a) => a.name),
  }));

  if (req.query.name) {
    try {
      let response = await axios.get(`https://api.rawg.io/api/games`, {
        params: {
          key: API_KEY,
          page_size: 15,
          search: req.query.name,
        },
      });

      if (!response.data.count) {
        return res
          .status(204)
          .json(
            `No existe un juego que coincida con tu búsqueda: "${req.query.name}"`
          );
      }

      const gameData = response.data.results.map((game) => ({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
        released: game.released,
        stores: game.stores[0]
      }));

      const dbGamesByName = dbGames.filter((game) =>
        game.name.toLowerCase().includes(req.query.name.toLowerCase())
      );

      const gameCreated = dbGamesByName.map((game) => ({
        ...game,
        isDBGame: true,
      }));

      const gameGet = gameData.map((game) => ({
        ...game,
        isDBGame: false,
      }));

      const results = [...gameCreated, ...gameGet];
      return res.json(results);
    } catch (err) {
      return res.sendStatus(500).json(message.error);
    }
  } else {
    try {
      let allGames = [...dbGames];

      let page = 1;
      let hasMoreResults = true;

      while (hasMoreResults && allGames.length < 100) {
        let response = await axios("https://api.rawg.io/api/games", {
          params: {
            key: API_KEY,
            page_size: 40,
            page,
          },
        });

        if (response.data.results.length === 0) {
          hasMoreResults = false;
        } else {
          allGames = [
            ...allGames,
            ...response.data.results.map((game) => ({
              id: game.id,
              name: game.name,
              background_image: game.background_image,
              rating: game.rating,
              genres: game.genres.map((genre) => genre.name),
              released: game.released,
              platforms: game.platforms,
              stores: game.stores[0],
              isDBGame: false,
            })),
          ];
        }

        page++;
      }

      const gameCreated = dbGames.map((game) => ({
        ...game,
        isDBGame: true,
      }));

      const gameGet = allGames.filter(
        (game) => !dbGames.some((dbGame) => dbGame.id === game.id)
      );

      const results = [...gameCreated, ...gameGet];

    
      return res.json(results.slice(0, 100));
    } catch (err) {
      return res.sendStatus(500).json(message.error);
    }
  }
};

module.exports = getAllGames;
