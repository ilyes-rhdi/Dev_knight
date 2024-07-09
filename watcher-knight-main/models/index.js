const mongoose =require('mongoose');
const User = require('./user');
const Candidate = require('./candidate');
const Vote = require('./vote');

mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error(err));

module.exports = {
    User,
    Candidate,
    Vote
};
