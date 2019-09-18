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
  vlan_mon: { type: String, default: '152'},
  mode: String,
  sites: String,
  device: String,
  nhead: String,
  ntale: String,
  hub: {type: String, uppercase: true},
  rack: String,
  patchera: String,
  position: String,
  dist: String,
  att: String,
  cmts: {type: String, uppercase: true},
  mac: {type: String, uppercase: true},
  interfaz: String,
  date: { type: Date, default: Date.now }
});

const HardwareSchema = new Schema({
  device: String,
  model: String,
  code: String,
  serial: String,
  description: String,
  date: { type: Date, default: Date.now }
})

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
  hardware: [HardwareSchema],
  pm: String,
  im: String,
  status: { type: String, default: 'Init' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', ClientSchema);