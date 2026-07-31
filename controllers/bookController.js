const db = require("../db/queries.js");

async function getBooksInGenre(req, res){
    try{
        const genreName = req.params.genreName;
        const books = await db.getAllBooks(genreName);
        if(!books){
            console.log("Books could not be loaded");
        }
        res.render('books.ejs', {books: books, genre: genreName});
    }catch(error){
        res.render('error.ejs', {title: error, message: error});
    }
}

module.exports = {
    getBooksInGenre,
}