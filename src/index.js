const express = require('express');
const path = require('path');

// Initializations
const app = express();
require('./database.js');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares

// Routes

// Static files
app.use(express.static(path.join(__dirname, 'app/build/')));

// Settings


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
})
