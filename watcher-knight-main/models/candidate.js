const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdfrom: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('candidate', CandidateSchema);
