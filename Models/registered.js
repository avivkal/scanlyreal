const mongoose = require('mongoose');

const registeredScheme = new mongoose.Schema({
    email: {
        type: String,
    },
    wifiUsername: {
        type: String
    },
    wifiPassword: {
        type: String
    },
    date: {
        type: Date
    },
});

module.exports = mongoose.model('registered', registeredScheme);