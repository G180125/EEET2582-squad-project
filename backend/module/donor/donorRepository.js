const Donor = require('./donor');

class DonorRepository {
  async create(data) {
    const donor = new Donor(data);
    return await donor.save();
  }

  async findById(id) {
    return await Donor.findById(id);
  }

  async update(id, data) {
    return await Donor.findByIdAndUpdate(id, data, { new: true });
  }

  async getAll(page, limit, filters) {
    const { search, gender } = filters;
    const query = {};
    if (gender) query.gender = gender;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }
    const offset = (page - 1) * limit;
    return {
      results: await Donor.find(query) 
                .skip(offset)  
                .limit(limit),
      totalDonors: await Donor.countDocuments(query)
    }
  }
}

module.exports = new DonorRepository();
