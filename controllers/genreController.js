const { createCheckSchema } = require("express-validator/lib/middlewares/schema.js");
const db = require("../db/queries.js");

async function getGenres(req, res){
    try{
        const genres = await db.getAllGenres();
        if(!genres){
            console.log("Genres could not be loaded");
        }
        res.render('index.ejs', {genres: genres});
    }catch(error){
        res.render('error.ejs', {title: error, message: error});
    }
}

function getNewGenre(req, res){
    res.render('createGenreForm.ejs');
}

function getEditGenre(req, res){
    res.render('editGenreForm.ejs', {genre: req.params.genreName});
}


async function createGenre(req, res){
    await db.createGenre(req.body.newGenreText);
    res.redirect("/");
}

async function editGenre(req, res){
    await db.editGenre(req.params.genreName, req.body.editGenreText);
    res.redirect("/");
}  

module.exports = {
    getGenres,
    getNewGenre,
    getEditGenre,
    createGenre,
    editGenre,
}