const express = require('express');
const router = express.Router();
const User = require('../Models/user')
const functions = require('../Functions/functions');

router.post('/', async (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!functions.userExists(user)) {
            User.create({
                email: req.body.email,
                password: req.body.password,
                sound: true
            }).then(user => {
                res.send(user)
            }).catch(error => res.status(500).send(error.message))
        }
        else {
            res.status(500).send('user exists already')
        }
    }).catch(error => res.status(500).send(error))


})

// router.post('/', async (req, res) => {
//     var userToSave = new UserModel({
//         email: req.body.email,
//         password: req.body.password
//     });
         
//     // save the user to database
//     userToSave.save(function(err) {
//         if (err) throw err;
//         res.send(user)
//     });


// })

module.exports = router