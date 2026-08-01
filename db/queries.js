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

async function addBook(title, author, genre, date){
    const authorResult = await pool.query('INSERT INTO author (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id', [author]);
    const author_id = authorResult.rows[0].id;
    const genreResult = await pool.query('SELECT id FROM genre WHERE name=$1', [genre]);
    const genre_id = genreResult.rows[0].id;
    const bookRes = await pool.query(`INSERT INTO books (author_id, genre_id, title, release_date) VALUES ($1, $2, $3, $4) RETURNING id`,
                                      [author_id, genre_id, title, date]);
}

module.exports = {
    getAllGenres,
    getAllBooks,
    getSpecificBook,
    getAuthorFromBook,
    createGenre,
    editGenre,
    addBook,
};