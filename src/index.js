const express = require('express');
const path = require('path');
const morgan = require('morgan');
 
// Initializations
require('./database.js');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

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
