const express = require('express');
const { getBooks, createBook, editBook, deleteBook, findBook, deleteAll } = require('../controllers/bookController.js');
const validator = require('../validator.js');

const router = express.Router();

// get all books
router.get("/get-books", getBooks);

// create new book
router.post("/create-book", validator.createBookValidation, createBook);

// edit book
router.put("/edit-book", validator.editBookValidation, editBook);

// delete all books
router.delete("/delete-books", deleteAll);

// delete a book
router.delete("/delete-book", validator.deleteBookValidation, deleteBook);

// get single book
router.get("/get-book", validator.getBookValidation, findBook);

module.exports = router;