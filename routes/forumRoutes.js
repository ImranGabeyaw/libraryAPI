const express = require('express');
const mongoose = require("mongoose");
const Book = require("../models/bookModel");

const router = express.Router();

//
router.get('/', async (req, res) => {
    try {
        const bookList = await Book.find();
        const arr = [];
        bookList.forEach(item => arr.push(({ ...item }._doc)));
        arr.forEach(item => {
            delete item['_id']
            delete item['id']
            delete item['inventoryCount']
        });
        const text = 'Forum list'
        const context = { arr, text };
        res.status(200).render("forumList", context);
    } catch (error) {
        res.status(404).send({ message: error.message || "Some error occurred while finding the books." });
    }
})



module.exports = router;