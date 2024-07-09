// server/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const candidateRoutes = require('./candidates');
const voteRoutes = require('./votes');

router.use('/auth', authRoutes);
router.use('/candidates', candidateRoutes);
router.use('/votes', voteRoutes);

module.exports = router;
