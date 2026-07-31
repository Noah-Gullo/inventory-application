const { Router } = require('express');
const indexRouter = Router();
const { getGenres } = require('../controllers/genreController');
const { getBooksInGenre, getBook } = require('../controllers/bookController');

indexRouter.get("/", getGenres);
indexRouter.post("/:genreName/:bookID", getBook);
indexRouter.get("/:genreName/:bookID", getBook)
indexRouter.post("/:genreName", getBooksInGenre)
indexRouter.get("/:genreName", getBooksInGenre)


module.exports = indexRouter;