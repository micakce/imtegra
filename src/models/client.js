const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientSchema = new Schema({
  abonado: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String },
  telefono: {type: String },
  address: {
    street: String,
    apto: String,
    location: String,
    city: String,
  },
  services:[{
    service: String,
    speed: Number,
  }],
  pm: String,
  im: String,
  status: String
});

module.exports = mongoose.model('Client', ClientSchema);
