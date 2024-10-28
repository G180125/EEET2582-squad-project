const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  amount: { type: Number, required: true },
  donationDate: { type: Date, default: Date.now },
  message: { type: String }
});

module.exports = mongoose.model('Donation', donationSchema);
