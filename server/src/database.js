const mongoose = require('mongoose');

// const URI = 'mongodb://localhost/imtegra';
const URI = process.env.MONGO_URI || "mongodb://localhost/imtegra";

const options = { useNewUrlParser: true, 'useFindAndModify': false }

mongoose.connect(URI, options)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
