const express = require('express');
const router = express.Router();
const User = require('../Models/user')
const functions = require('../Functions/functions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// router.post('/', async (req, res) => {
//     User.findOne({ email: req.body.email }).then(user => {
//         if (!functions.userExists(user)) {
//             User.create({
//                 email: req.body.email,
//                 password: req.body.password,
//                 sound: true
//             }).then(user => {
//                 res.send(user)
//             }).catch(error => res.status(500).send(error.message))
//         }
//         else {
//             res.status(500).send('user exists already')
//         }
//     }).catch(error => res.status(500).send(error))


// })

router.post('/', async (req, res) => {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.sound = true;
    console.log(newUser)
    newUser.save(function(err, user) {
      if (err) {
          res.status(500).send('משתמש עם הפרטים הללו כבר קיים')
      } else {
        console.log(user)
        user.password = undefined;
        const token = jwt.sign({ email: user.email, _id: user._id }, process.env.TOKEN_SECRET);
        console.log({ token, ...user._doc })
        res.header("auth-token", token).json({ token, ...user._doc });    
      }
    });  
})


module.exports = router