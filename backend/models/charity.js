const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const charitySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['individual', 'corporate', 'non-profit'], required: true },
  description: { type: String },
  location: { type: String },
  contactInfo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Charity', charitySchema);
