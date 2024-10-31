const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String , required: true},
  lastName: { type: String , required: true},
  address: { type: String },
  avatar: { type: String },
  stripeId: { type: String }
});

module.exports = mongoose.model('Donor', donorSchema);
