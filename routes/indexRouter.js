const { Router } = require('express');
const indexRouter = Router();
const { getGenres, getNewGenre, createGenre } = require('../controllers/genreController');
const { getBooksInGenre, getBook } = require('../controllers/bookController');

indexRouter.get("/", getGenres);
indexRouter.get("/newGenre", getNewGenre);
indexRouter.post("/newGenre", createGenre);

indexRouter.post("/:genreName/:bookID", getBook);
indexRouter.get("/:genreName/:bookID", getBook);

indexRouter.post("/:genreName", getBooksInGenre);
indexRouter.get("/:genreName", getBooksInGenre);


module.exports = indexRouter;