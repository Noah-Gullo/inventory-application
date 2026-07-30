const db = require("../db/queries.js");

async function getGenres(req, res){
    try{
        const genres = await db.getAllGenres();
        if(!genres){
            console.log("WTF");
        }
        res.render('index.ejs', {genres: genres});
    }catch(error){
        res.render('error.ejs', {title: error, message: error});
    }
}

module.exports = {
    getGenres,
}