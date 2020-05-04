const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: {type: String},
  lastname: {type: String},
  username: {type: String},
  email: {type: String},
  password: {type: String},
  role: {type: String},
});


UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);

