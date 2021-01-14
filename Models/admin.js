const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminScheme = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});

adminScheme.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('admin', adminScheme);