const express = require('express');
const User = require('../models/User');
const db = require('../database/db');

const router = express.Router();

router.post('/register', async (req, res)=> {
    const { username, password } = req.body;

    try {
        await User.create(username, password);

        req.session.user = { username };

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await User.findByUsername(username);
        const user = rows[0];

        if (!user) {
            return res.status(404).send('User not found,');
        }

        const isPasswordValid = bcrypt.compareSynce(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid password.');
        }

        req.session.user = { username };

        res.redirect('/dashboard');
     } catch (error) {
        res.status(500).send('Error logging in.');
     }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;