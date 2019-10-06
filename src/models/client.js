const mongoose = require('mongoose');
const { Schema } = mongoose;
const Service = require('./service');
const Hardware = require('./hardware');



const ClientSchema = new Schema({
  abonado: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String },
  telefono: { type: String },
  address: {
    street: String,
    apto: String,
    location: String,
    city: String,
  },
  services: [Service.schema],
  hardware: [Hardware.schema],
  status: { type: String, default: 'Implementacion' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', ClientSchema);
