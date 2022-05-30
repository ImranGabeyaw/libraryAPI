const mongoose = require("mongoose");
const Book = require("../models/bookModel");

exports.getBooks = async(req, res) => {
    try {
        const bookList = await Book.find();
        const arr = [];
        bookList.forEach(item => arr.push(({...item }._doc)));
        arr.forEach(item => {
            delete item['_id']
        });
        const text = 'List of all books in the library'
        const context = { arr, text };
        res.status(200).render("resultTable", context);
    } catch (error) {
        res.status(404).send({ message: error.message || "Some error occurred while finding the books." });
    }
}

exports.createBook = async(req, res) => {
    if (!req.body.title || !req.body.inventoryCount) {
        res.status(400).send({ message: "You must provide a title and inventory count to create a user." });
        return;
    } else {
        try {
            bookList = await Book.find({});
            // if this is not the first book in the collection,
            if (bookList) {
                const ids = bookList.map(object => {
                    return object.id;
                })
                largestID = Math.max(...ids);
                const book = new Book({
                    id: largestID + 1,
                    title: req.body.title,
                    inventoryCount: req.body.inventoryCount
                });
                await book.save();
                const newBook = ({...book }._doc);
                delete newBook['_id'];
                const arr = [];
                arr.push(newBook);
                const text = 'Book with title ' + req.body.title + ' was created';
                const context = { arr, text };
                res.status(201).render("resultTable", context);
            } else {
                const book = new Book({
                    id: 1,
                    title: req.body.title,
                    inventoryCount: req.body.inventoryCount
                });
                await book.save();
                const newBook = ({...book }._doc);
                delete newBook['_id'];
                const arr = [];
                arr.push(newBook);
                const text = 'Book with title ' + req.body.title + ' was created';
                const context = { arr, text };
                res.status(201).render("resultTable", context);
            }
        } catch (error) {
            res.status(409).send({ message: error.message || "Some error occurred while creating the book." });
        }
    }
}

exports.editBook = async(req, res) => {
    if (!req.body.id) {
        res.status(400).send({ message: "You must provide the id of the book to update." });
        return;
    }
    try {
        const book = await Book.findOneAndUpdate({ id: req.body.id }, {
            title: req.body.title,
            inventory_count: req.body.inventory_count,
        }, { new: true });
        if (!book) {
            return res.status(404).send({
                message: "Book with id " + req.body.id + " not found",
            });
        } else {
            const newBook = ({...book }._doc);
            delete newBook['_id'];
            const arr = [];
            arr.push(newBook);
            const text = 'Book with id ' + ' was edited to be the following:'
            const context = { arr, text };
            res.status(201).render("resultTable", context);
        }
    } catch (error) {
        res.status(409).send({ message: error.message || "Some error occurred while updating the book." });
    }
}

exports.deleteAll = async(req, res) => {
    try {
        const deleted = await Book.deleteMany({});
        res.status(200).send({ message: `${deleted.deletedCount} books were deleted.` });
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while deleting the books." });
    }
}

exports.deleteBook = async(req, res) => {
    try {
        const removedBook = await Book.findOneAndRemove({ id: req.body.id });
        if (!removedBook) {
            return res.status(404).send({
                message: "Book with id  " + req.body.id + " not found.",
            });
        } else {
            const newBook = ({...removedBook }._doc);
            delete newBook['_id'];
            const arr = [];
            const text = 'Succesfully deleted the following book from the database'
            arr.push(newBook);
            const context = { arr, text };
            res.status(200).render("resultTable", context);
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while deleting the book." });
    }
}

exports.findBook = async(req, res) => {
    try {
        const book = await Book.findOne({ id: req.query.id });
        if (!book) {
            return res.status(404).send({
                message: "book with id  " + req.query.id + " not found",
            });
        }
        const newBook = ({...book }._doc);
        delete newBook['_id'];
        const arr = [];
        arr.push(newBook);
        const text = 'Information on the book with id ' + req.query.id + ':'
        const context = { arr, text };
        res.status(200).render("resultTable", context);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while finding the book." });
    }
}

exports.getForums = async(req, res) => {
    try {
        const bookList = await Book.find();
        const arr = [];
        bookList.forEach(item => arr.push(({...item }._doc)));
        arr.forEach(item => {
            delete item['_id']
            delete item['id']
            delete item['inventoryCount']
        });
        const text = 'Forum list'
        const context = { arr, text };
        res.status(200).render("resultTable", context);
    } catch (error) {
        res.status(404).send({ message: error.message || "Some error occurred while finding the books." });
    }
}