const express = require('express');
const router = express.Router();
const User = require('../Models/user')
const functions = require('../Functions/functions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/admin')

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
  console.log('token')
  User.findOne({
    "email": req.body.email
  }).then(user => {
    if (!user || !user.comparePassword(req.body.password)) {
      res.status(401).send('האימייל או הסיסמה שהוזנו לא נכונים');
    }
    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.TOKEN_SECRET);
    console.log('login token')
    console.log(token)
    res.header("Authorization", token).json({ token, ...user._doc });
  }).
  catch(error => res.status(500).send(error.message))


})

router.post('/wifivalidation', async (req, res) => {
  console.log(req.body.wifiUsername)
  User.findOne({
    "wifiUsername": req.body.wifiUsername
  }).then(user => {
    console.log(user)
    if (!user || !user.comparePasswordWifi(req.body.wifiPassword)) {
      res.status(401).send('error');
    }
    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.TOKEN_SECRET);
    res.header("Authorization", token).json({ token, ...user._doc });
  }).
  catch(error => res.status(500).send(error.message))


})

router.post('/idValidation', async (req, res) => {
  console.log(req.body.deviceID)
  User.findOne({
    "deviceID": req.body.deviceID
  }).then(user => {
    console.log(user)
    if (!user) {
      res.status(401).send('error');
    }
    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.TOKEN_SECRET);
    res.header("Authorization", token).json({ token, ...user._doc });
  }).
  catch(error => res.status(500).send(error.message))


})

router.post('/adminfind', async (req, res) => {
  console.log(req.body.email)
    Admin.findOne({
      "email": req.body.email
    }).then(user => {
      console.log(user)
      if (!user || !user.comparePassword(req.body.password)) {
        res.status(401).send('האימייל או הסיסמה שהוזנו לא נכונים');
      }
      const token = jwt.sign({ email: user.email, _id: user._id, admin:true }, process.env.TOKEN_SECRET);
      console.log(token)
      res.header("Authorization", token).json({ token, ...user._doc });
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