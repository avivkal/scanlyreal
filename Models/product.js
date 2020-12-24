const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    email: String,
    selection: String,
    barcode: String,
    name: String,
    creationDate: Date,
    added: mongoose.Schema.Types.Mixed,
    shufersalPrice: mongoose.Schema.Types.Mixed,
    ramiLevyPrice: mongoose.Schema.Types.Mixed,
    image: String
});

module.exports = mongoose.model('product', productScheme);



// const mongoose = require('mongoose');

// const productScheme = new mongoose.Schema({
//     email: {
//         type: String,
//     },
//     selection: {
//         type: String,
//     },
//     barcode: {
//         type: String,
//     },
//     name: {
//         type: String,
//     },
//     creationDate: {
//         type: Date,
//     },
//     added:{
//         type: Boolean
//     },
//     shufersalPrice: {
//         type: Number,
//     },
//     ramiLevyPrice: {
//         type: Number,
//     },
//     image: {
//         type: String,
//     },
// });

// module.exports = mongoose.model('product', productScheme);