const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    // Create a new user in the database
    const newUser = await User.create({ email, username, password });
    res.status(200).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;




