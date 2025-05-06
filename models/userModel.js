const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true,trim: true },
  email: { type: String, required: true, unique: true ,lowercase:true},
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'buyer', 'seller'], default: 'buyer' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
