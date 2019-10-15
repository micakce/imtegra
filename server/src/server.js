const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Initializations
require('./database.js');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
// const env = process.env.NODE_ENV
// console.log(process.env.NODE_ENV);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.use(require('./routes/users.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'app/build/')));

// Settings


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
})
