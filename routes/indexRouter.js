const { Router } = require('express');
const indexRouter = Router();
const { getGenres, getNewGenre, getEditGenre, createGenre, editGenre } = require('../controllers/genreController');
const { getBooksInGenre, getBook, getNewBook, addBook} = require('../controllers/bookController');

indexRouter.get("/", getGenres);
indexRouter.get("/newGenre", getNewGenre);
indexRouter.post("/newGenre", createGenre);

indexRouter.get("/editGenre/:genreName", getEditGenre);
indexRouter.post("/editGenre/:genreName", editGenre);

indexRouter.get("/newBook/:genreName", getNewBook);
indexRouter.post("/newBook/:genreName", addBook)

indexRouter.post("/:genreName/:bookID", getBook);
indexRouter.get("/:genreName/:bookID", getBook);

indexRouter.post("/:genreName", getBooksInGenre);
indexRouter.get("/:genreName", getBooksInGenre);

module.exports = indexRouter;