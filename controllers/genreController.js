const db = require("../db/queries.js");

async function getGenres(req, res){
    try{
        const genres = await db.getAllGenres();
        res.render('index.ejs', {genres: genres});
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {
    getGenres,
}