const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hours_contributed: { type: Number, required: true },
  participationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
