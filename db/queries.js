const pool = require("./pool.js");

async function getAllGenres(){
    const { rows: genres } = await pool.query("SELECT name FROM genre");
    return genres;   
}

async function getAllBooks(genreName){
    const {rows: books} =  await pool.query('SELECT books.* FROM books JOIN genre ON books.genre_id = genre.id WHERE genre.name = $1;', [genreName]);
    return books;
}

async function getSpecificBook(bookID){
    const {rows: targetBook} = await pool.query('SELECT * FROM books WHERE id=$1', [bookID]); 
    return targetBook[0];
}

module.exports = {
    getAllGenres,
    getAllBooks,
    getSpecificBook,
};