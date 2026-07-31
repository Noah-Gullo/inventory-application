const { Router } = require('express');
const indexRouter = Router();
const { getGenres } = require('../controllers/genreController');
const { getBooksInGenre } = require('../controllers/bookController');

indexRouter.get("/", getGenres);
indexRouter.post("/:genreName", getBooksInGenre)

module.exports = indexRouter;