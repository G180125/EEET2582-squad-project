const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  sector: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'closed'], required: true },
  charity: { type: Schema.Types.ObjectId, ref: 'Charity', required: true },
  volunteers: [volunteerSchema]
});

module.exports = mongoose.model('Project', projectSchema);
