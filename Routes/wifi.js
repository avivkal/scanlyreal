const express = require('express');
const router = express.Router();
const User = require('../Models/user')
const Registered = require('../Models/registered')
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const newWifiPassword =  bcrypt.hashSync(req.body.wifiPassword, 10);
    Registered.create({
        email:req.body.email,
        wifiUsername: req.body.wifiUsername,
        wifiPassword: req.body.wifiPassword,
        date: new Date()
      })
    User.findOneAndUpdate({ email: req.body.email }, {wifiUsername: req.body.wifiUsername, wifiPassword: newWifiPassword},{new: true}).
    then(data => { 
        data.wifiPassword = req.body.wifiPassword;
        res.send(data)
    }).catch(error => res.status(500).send(error))

})

module.exports = router