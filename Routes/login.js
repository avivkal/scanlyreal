const express = require('express');
const router = express.Router();
const User = require('../Models/user')
const functions = require('../Functions/functions');
const jwt = require('jsonwebtoken');
// router.post('/', async (req, res) => {
//   User.findOne({ "email": req.body.email, "password": req.body.password }).then(user => {
//     if (functions.userExists(user)) {
//       res.json(user)
//     }
//     else {
//       res.status(500).send('אימייל/סיסמה לא נכונים אנא נסה שנית')
//     }
//   })
//     .catch(error => res.status(500).send(error.message))
// })


router.post('/', async (req, res) => {
  User.findOne({
    "email": req.body.email
  }).then(user => {
    if (!user || !user.comparePassword(req.body.password)) {
      res.status(401).send('האימייל או הסיסמה שהוזנו לא נכונים');
    }
    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).json({ token, ...user._doc });
  }).
  catch(error => res.status(500).send(error.message))


})



// router.post('/', async (req, res) => {

//   UserModel.findOne({ email: req.body.email }, function(err, user) {
//     if (err) throw err;
     
//     // test a matching password
//     console.log(user)
//     user.comparePassword(req.body.password, function(err, isMatch) {
//         if (err) throw err;
//         res.json(user)
//         console.log('yess', isMatch); // -&gt; Password123: true
//     });
     
//   });

// })

module.exports = router