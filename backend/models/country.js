const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: { type: String, required: true, unique: true },
  subscriptionList: [{ type: Schema.Types.ObjectId, ref: 'Donor' }]
});

module.exports = mongoose.model('Country', countrySchema);
