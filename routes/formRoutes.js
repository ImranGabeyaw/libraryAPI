const express = require('express');
const router = express.Router();

// get a book
router.get("/getBook", (req, res) => {
    res.render('getBook', {});
});

// create a book
router.get("/createBook", (req, res) => {
    res.render('createBook', {});
});

// edit a book
router.get("/editBook", (req, res) => {
    res.render('editBook', {});
});

// delete a book
router.get("/deleteBook", (req, res) => {
    res.render('deleteBook', {});
});

// get user's name
router.get("/getUser", (req, res) => {
    const title = req.query.title
    res.render('getUsername', {title});
});

// get user's name
router.get("/chatroom", (req, res) => {
    const title = req.query.title
    const username = req.query.username
    res.render('chat', {title, username});
});

module.exports = router;