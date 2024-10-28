const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserType = require('../enums/UserType');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  role: { type: String, enum: Object.values(UserType), required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  type: { 
    type: String, 
    enum: ['individual', 'corporate', 'non-profit'], 
    validate: {
        validator: function (value) {
          return this.role !== UserType.CHARITY || (this.role === UserType.CHARITY && value != null && value.trim() !== '');
        },
        message: 'Type is required for Charity role'
      } },
  description: {
    type: String,
    validate: {
      validator: function (value) {
        return this.role !== UserType.CHARITY || (this.role === UserType.CHARITY && value != null && value.trim() !== '');
      },
      message: 'Description is required for Charity role'
    }
  },
  contactInfo: {
    type: String,
    validate: {
      validator: function (value) {
        return this.role !== UserType.CHARITY || (this.role === UserType.CHARITY && value != null && value.trim() !== '');
      },
      message: 'Contact info is required for Charity role'
    }
  }
});

module.exports = mongoose.model('User', userSchema);
