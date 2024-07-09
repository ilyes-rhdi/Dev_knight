const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    voted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', VoteSchema);
