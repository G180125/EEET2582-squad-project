const Donation = require('../models/donation');

class DonationRepository {
  async create(donationData) {
    const donation = new Donation(donationData);
    return await donation.save();
  }

  async findById(donationId) {
    return await Donation.findById(donationId)
      .populate('user', 'name email')
      .populate('project', 'name'); 
  }

  async findAll() {
    return await Donation.find()
      .populate('user', 'name email') 
      .populate('project', 'name'); 
  }
}

module.exports = new DonationRepository();
