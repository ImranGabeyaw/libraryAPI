const mongoose = require('mongoose');

const schema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 254,
    },
    inventoryCount: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    versionKey: false
});

const Book = mongoose.model("Book", schema);
module.exports = Book;