const mongoose = require('mongoose');

const URI = 'mongodb://localhost/imtegra';

mongoose.connect(URI, { useNewUrlParser: true, 'useFindAndModify': false })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
