const { query, body, validationResult } = require('express-validator');

exports.getBookValidation = [
    query('id', 'Book id must be a positive integer').trim().isInt({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            e = errors.array()[0].msg;
            const context = { e }
            return res.status(422).render('getBook', context);
        }
        next();
    },
];

exports.createBookValidation = [
    body('title', 'Book title must not be empty').trim().isLength({ min: 1 }).escape(),
    body('inventoryCount', 'Iventory count must be a positive integer').trim().isInt({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            e = errors.array()[0].msg;
            const context = { e }
            return res.status(422).render('createBook', context);
        }
        next();
    },
];

exports.editBookValidation = [
    body('id', 'Book id must be a positive integer').trim().isInt({ min: 1 }).escape(),
    body('title', 'Book title must not be empty').trim().isLength({ min: 1 }).escape(),
    body('inventoryCount', 'Iventory count must be a positive integer').trim().isInt({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            e = errors.array()[0].msg;
            const context = { e }
            return res.status(422).render('editBook', context);
        }
        next();
    },
];

exports.deleteBookValidation = [
    body('id', 'Book id must be a positive integer').trim().isInt({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            e = errors.array()[0].msg;
            const context = { e }
            return res.status(422).render('deleteBook', context);
        }
        next();
    },
];