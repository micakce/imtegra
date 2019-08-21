const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientSchema = new Schema({
    abonado: { type: Number, required: true },
    name: { type: String, required: true },
    address: {
        street: String,
        apto: String,
        location: String,
        city: String,
    }
    services:[{
        service: String,
        speed: Number,
    }]
});

module.exports = mongoose.model('Client', ClientSchema);
