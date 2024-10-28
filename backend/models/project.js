const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['global', 'local'], required: true },
  description: { type: String },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  sector: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  duration: { type: String, required: true },
  status: { type: String, enum: ['open', 'closed'], required: true },
  charity: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  account: { type: String, required: true },
  volunteers: [volunteerSchema]
});

module.exports = mongoose.model('Project', projectSchema);
