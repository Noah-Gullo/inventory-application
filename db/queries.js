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

async function getAuthorFromBook(bookID){
    const {rows: targetAuthor} = await pool.query('SELECT author.name FROM author JOIN books ON books.author_id = author.id WHERE books.id = $1;', [bookID]);
    return targetAuthor[0];
}

async function createGenre(genreName){
    await pool.query('INSERT INTO genre (name) VALUES ($1)', [genreName]);
}  

async function editGenre(prevName, newName){
    await pool.query('UPDATE genre SET name=$2 WHERE name=$1', [prevName, newName]);
}

module.exports = {
    getAllGenres,
    getAllBooks,
    getSpecificBook,
    getAuthorFromBook,
    createGenre,
    editGenre,
};