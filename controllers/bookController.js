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

async function getBook(req, res){
    try{
        const bookID = req.params.bookID;
        const genreName = req.params.genreName;
        const book = await db.getSpecificBook(bookID);
        const author = await db.getAuthorFromBook(bookID);
        if(!book){
            console.log("Book could not be loaded");
        }
        res.render('bookDetails.ejs', {book: book, genre: genreName, author: author});
    }catch(error){
        res.render('error.ejs', {title: error, message: error});
    }
}

function getNewBook(req, res){
    res.render("newBook.ejs", {genre: req.params.genreName});
}

async function addBook(req, res){
    await db.addBook(req.body.newBookTitle, req.body.newAuthorName, req.params.genreName, req.body.newBookDate);
    res.redirect(`/${req.params.genreName}`);
}

function getEditBook(req, res){
    res.render("editBookForm.ejs", {genre: req.params.genreName, id: req.params.bookID});
}

async function editBook(req, res){
    await db.editBook(req.params.bookID, req.body.editedBookTitle, req.body.editedAuthorName, req.params.genreName, req.body.editedBookDate);
    res.redirect(`/${req.params.genreName}`)
}

async function deleteBook(req, res){
    await db.deleteBook(req.params.bookID);
    res.redirect(`/${req.params.genreName}`);
}

module.exports = {
    getBooksInGenre,
    getBook,
    getEditBook,
    getNewBook,
    addBook,
    editBook,
    deleteBook,
}