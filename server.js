const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path');
const verifyToken = require("./Routes/validate-token");
const verifyTokenAdmin = require("./Routes/validate-token-admin");

require('dotenv').config();

const app = express()

app.options('*',cors())
app.use('*',cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, "client/build")))
// app.use(express.static("client/build"));

// app.get('*', function(req, res) {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

const register = require('./Routes/register');
app.use('/api/register', register);

const login = require('./Routes/login');
app.use('/api/login', login);

const wifi = require('./Routes/wifi');
app.use('/api/wifi',verifyToken, wifi);

const settings = require('./Routes/settings');
app.use('/api/settings', settings);

const details = require('./Routes/details');
app.use('/api/details',verifyToken, details);

const products = require('./Routes/products');
app.use('/api/products',verifyToken, products);

const admin = require('./Routes/admin');
app.use('/api/admin',verifyTokenAdmin, admin);

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server is running on port ' + PORT)))
    .catch(err => console.log(err))

mongoose.set('useFindAndModify', false)