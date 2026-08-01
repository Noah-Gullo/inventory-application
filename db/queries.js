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

async function editBook(id, title, author, genre, date){
    const authorResult = await pool.query(`INSERT INTO author (Name) VALUES ($1) ON CONFLICT (Name) DO UPDATE SET Name = EXCLUDED.Name RETURNING ID`, [author]);
    const author_id = authorResult.rows[0].id;
    const genreResult = await pool.query('SELECT id FROM genre WHERE name=$1', [genre]);
    const genre_id = genreResult.rows[0].id;
    await pool.query('UPDATE books SET author_id= $2, genre_id = $3, title = $1, release_date = $4 WHERE id=$5', [title, author_id, genre_id, date, id]);
}

module.exports = {
    getAllGenres,
    getAllBooks,
    getSpecificBook,
    getAuthorFromBook,
    createGenre,
    editGenre,
    addBook,
    editBook,
};