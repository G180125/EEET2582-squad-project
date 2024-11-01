const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  subscriptionList: [{ type: Schema.Types.ObjectId, ref: 'Donor' }],
  project: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

module.exports = mongoose.model('Category', categorySchema);
