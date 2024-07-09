const fs = require('fs');

const logToFile = (message) => {
    fs.appendFile('server.log', `${new Date().toISOString()} - ${message}\n`, (err) => {
        if (err) console.error('Error writing to log file');
    });
};

module.exports = { logToFile };
