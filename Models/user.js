const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please fill a valid email address'],
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    wifiUsername: {
        type: String
    },
    wifiPassword: {
        type: String
    },
    shufersalUsername: {
        type: String
    },
    shufersalPassword: {
        type: String
    },
    ramiLevyUsername: {
        type: String
    },
    ramiLevyPassword: {
        type: String
    },
    selection: {
        type: String
    },
    sound: {
        type: Boolean
    }
});

userScheme.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);

};

module.exports = mongoose.model('user', userScheme);