const mongoose = require('mongoose');

const { Schema } = mongoose;

const ServiceSchema = new Schema({
  service: { type: String, required: true },
  plan: { type: String, required: true },
  medium: String,
  red: String,
  ip: String,
  dg: String,
  mask: String,
  vlan: String,
  ip_mon: String,
  dg_mon: String,
  mask_mon: String,
  vlan_mon: String,
  type: String,
  sites: String,
  device: String,
  nhead: String,
  ntale: String
});

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
  services: [ServiceSchema],
  pm: String,
  im: String,
  status: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', ClientSchema);