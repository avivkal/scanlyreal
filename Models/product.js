const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    email: {
        type: String,
    },
    selection: {
        type: String,
    },
    barcode: {
        type: String,
    },
    name: {
        type: String,
    },
    creationDate: {
        type: Date,
    },
    added:{
        type: Boolean
    },
    shufersalPrice: {
        type: Number,
    },
    ramiLevyPrice: {
        type: Number,
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model('product', productScheme);