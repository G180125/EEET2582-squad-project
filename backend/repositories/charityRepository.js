const Charity = require('../models/charity');

class CharityRepository {
  async create(data) {
    const charity = new Charity(data);
    return await charity.save();
  }

  async count() {
    return await Charity.countDocuments();
  }

  async findById(id) {
    return await Charity.findById(id);
  }

  async update(id, data) {
    return await Charity.findByIdAndUpdate(id, data, { new: true });
  }

  async getAll(page, limit) {
    const offset = (page - 1) * limit;
    return await Charity.find() 
      .skip(offset)  
      .limit(limit);
  }
}

module.exports = new CharityRepository();
