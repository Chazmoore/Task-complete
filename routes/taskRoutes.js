const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.post('/task', async (req, res) => {
    const { title, description } = req.body;

    try {
        await Task.create(title, description);

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Error creating task.');
    }
});

router.put('/task/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Task.update(id, true);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send('Error updating task.');
    }
});

module.exports = routers; 