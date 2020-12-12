const express = require('express');
const router = express.Router();
const User = require('../Models/user')

router.post('/', async (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, {wifiUsername: req.body.wifiUsername, wifiPassword: req.body.wifiPassword},{new: true}).
    then(data => { res.send(data)
    }).catch(error => res.status(500).send(error))

})

module.exports = router