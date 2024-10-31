const Donor = require('./donor');

class DonorRepository {
  async create(data) {
    const donor = new Donor(data);
    return await donor.save();
  }
  
  async count() {
    return await Donor.countDocuments();
  }

  async findById(id) {
    return await Donor.findById(id);
  }

  async update(id, data) {
    return await Donor.findByIdAndUpdate(id, data, { new: true });
  }

  async getAll(page, limit) {
    const offset = (page - 1) * limit;
    return await Donor.find() 
      .skip(offset)  
      .limit(limit);
  }
}

module.exports = new DonorRepository();
