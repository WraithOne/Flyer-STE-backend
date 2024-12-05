const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register user
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        role: req.body.role,
        password: req.body.password
    });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({username});

    if(user && user.password === password) {
        res.json(user);
    } else {    
        res.status(400).json('Error: User not found');
    }
});
module.exports = router;
