const mongoose = require('mongoose');
const { Schema } = mongoose;

const HardwareSchema = new Schema({
  device: String,
  model: String,
  code: String,
  serial: String,
  description: String,
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Hardware', HardwareSchema);
