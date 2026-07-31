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

async function getNewGenre(req, res){
    res.render('createBookForm.ejs');
}

async function createGenre(req, res){
    await db.createGenre(req.body.newGenreText);
    res.redirect("/");
}

module.exports = {
    getGenres,
    getNewGenre,
    createGenre,
}