const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware'); 
const User = require('../models/user');
const Candidate = require('../models/candidate');
const { logToFile } = require('../utils/logger'); 


router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    const { name, description } = req.body;

    try {
       
        const candidate = new Candidate({ name, description, createdBy: req.user.id });
        await candidate.save();

        
        logToFile(`New candidate created: ${candidate.name} by ${req.user.username}`);

        res.status(201).json(candidate);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
