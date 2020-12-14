const express = require('express');
const router = express.Router();
const User = require('../Models/user')

router.post('/', async (req, res) => {
    User.findOne({ email: req.body.email }).
        then(data => {
            res.send(data)
        }).catch(error => res.status(500).send(error))

})

// router.get('/:email', async (req, res) => {
//     User.findOne({ email: req.params.email }).
//         then(data => {
//             res.send(data)
//         }).catch(error => res.status(500).send(error))

// })

module.exports = router