const express = require('express');
const router = express.Router();
const User = require('../Models/user')

router.post('/', async (req, res) => {
    User.findOneAndUpdate({ email: req.body.email },
        {
            shufersalUsername: req.body.shufersalUsername,
            shufersalPassword: req.body.shufersalPassword,
            ramiLevyUsername: req.body.ramiLevyUsername,
            ramiLevyPassword: req.body.ramiLevyPassword,
            selection: req.body.selection,
            sound: req.body.sound
        },{new: true}).
        then(data => {
            res.send(data)
        }).catch(error => res.status(500).send(error))

})

module.exports = router