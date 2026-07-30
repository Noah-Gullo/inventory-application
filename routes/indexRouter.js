const { Router } = require('express');
const indexRouter = Router();
const { getGenres } = require('../controllers/genreController');

indexRouter.get("/", getGenres);

module.exports = indexRouter;