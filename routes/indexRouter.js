const { Router } = require('express');
const indexRouter = Router();
const { getGenres, getNewGenre, getEditGenre, createGenre, editGenre, deleteGenre } = require('../controllers/genreController');
const { getBooksInGenre, getBook, getEditBook, getNewBook, addBook, editBook, deleteBook} = require('../controllers/bookController');

indexRouter.get("/", getGenres);
indexRouter.get("/newGenre", getNewGenre);
indexRouter.post("/newGenre", createGenre);

indexRouter.get("/editGenre/:genreName", getEditGenre);
indexRouter.post("/editGenre/:genreName", editGenre);

indexRouter.get("/newBook/:genreName", getNewBook);
indexRouter.post("/newBook/:genreName", addBook)

indexRouter.get("/editBook/:genreName/:bookID", getEditBook);
indexRouter.post("/editBook/:genreName/:bookID", editBook);

indexRouter.post("/:genreName/delete", deleteGenre);
indexRouter.post("/:genreName/:bookID/delete", deleteBook);

indexRouter.post("/:genreName/:bookID", getBook);
indexRouter.get("/:genreName/:bookID", getBook);


indexRouter.post("/:genreName", getBooksInGenre);
indexRouter.get("/:genreName", getBooksInGenre);

module.exports = indexRouter;