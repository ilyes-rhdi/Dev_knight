const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');

const app = express();
app.use(express.json()); 


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res)  {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/votes', require('./routes/votes'));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
