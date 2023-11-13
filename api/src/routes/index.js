const { Router } = require('express');
const getAllGames = require('../controllers/getAllGames');
const getGamesById = require('../controllers/getGamesById')
const createGame = require("../controllers/createGame")
const getGenre = require("../controllers/getGenre")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/genres', getGenre);
router.get('/:id', getGamesById);
router.get('/', getAllGames);
router.post('/', createGame);


module.exports = router;