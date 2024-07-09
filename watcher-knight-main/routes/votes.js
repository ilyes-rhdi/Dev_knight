const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');
const Candidate = require('../models/candidate');
const Vote = require('../models/vote');
const { logToFile } = require('../utils/logger'); 


router.post('/', authMiddleware, async (req, res) => {
    const { candidateId } = req.body;

    try {
        
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        
        const existingVote = await Vote.findOne({ user: req.user.id, candidate: candidateId });
        if (existingVote) {
            return res.status(400).json({ message: 'Already voted for this candidate' });
        }

       
        const vote = new Vote({ user: req.user.id, candidate: candidateId });
        await vote.save();

     
        logToFile(`Vote recorded: User ${req.user.username} voted for Candidate ${candidate.name}`);

        res.status(201).json(vote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
