const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'CharityProject', required: true },
  amount: { type: Number, required: true },
  donationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
