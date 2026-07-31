const pool = require("./pool.js");

async function getAllGenres(){
    const { rows: genres } = await pool.query("SELECT name FROM genre");
    return genres;   
}

async function getAllBooks(genreName){
    const {rows: books} =  await pool.query('SELECT books.* FROM books JOIN genre ON books.genre_id = genre.id WHERE genre.name = $1;', [genreName]);
    return books;
}

module.exports = {
    getAllGenres,
    getAllBooks,
};