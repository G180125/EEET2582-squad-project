const DonorRepository = require('./donorRepository');
const UserRepository = require('../user/userService');
const { validateDonorRegisterRequest } = require('./donorDto');

class DonorService {
  // Service to get a donor by ID
  async getDonorById(id) {
    const donor = await DonorRepository.findById(id);
    if (!donor) {
      throw new Error('Donor not found');
    }
    return donor;
  }

  // Service to update a donor by ID
  async updateDonor(id, data) {
    const updatedDonor = await DonorRepository.update(id, data);
    if (!updatedDonor) {
      throw new Error('Donor not found or update failed');
    }
    return updatedDonor;
  }

  // Service to get all donors
  async getAllDonors(page, limit, filters) {
    const { results, totalDonors } = await DonorRepository.getAll(page, limit, filters);
    const totalPages = Math.ceil(totalDonors / limit);
    const isLast = page >= totalPages; 

    return {
      currentPage: page,
      totalPages: totalPages,
      pageSize: limit,
      isLast: isLast,
      data: results 
    };
  }

  async createDonor(data, id) {
    const isVerified = await UserRepository.isVerified(id);
    if(!isVerified) {
      throw new Error('This User has NOT verified the email for register!');
    }

    const { error } = validateDonorRegisterRequest(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const donorData = {
      ...data,
      user: id,
      totalDonation: 0,
    };

    return await DonorRepository.create(donorData);
  }
}

module.exports = new DonorService();
