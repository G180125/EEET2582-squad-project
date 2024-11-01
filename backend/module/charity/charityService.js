const CharityRepository = require('./charityRepository');
const UserRepository = require('../user/userService');
const { validateCharityRegisterRequest } = require('./charityDto');

class CharityService {
  // Service to get a Charity by ID
  async getCharityById(id) {
    const Charity = await CharityRepository.findById(id);
    if (!Charity) {
      throw new Error('Charity not found');
    }
    return Charity;
  }

  // Service to update a Charity by ID
  async updateCharity(id, data) {
    const updatedCharity = await CharityRepository.update(id, data);
    if (!updatedCharity) {
      throw new Error('Charity not found or update failed');
    }
    return updatedCharity;
  }

  // Service to get all Charities
  async getAllCharities(page, limit, filters) { 
    const { results, totalCharities } = await CharityRepository.getAll(page, limit, filters);
    const totalPages = Math.ceil(totalCharities / limit);
    const isLast = page >= totalPages; 

    return {
      currentPage: page,
      totalPages: Math.ceil(totalCharities / limit),
      pageSize: limit,
      isLast: isLast,
      data: results 
    };
  }

  async createCharity(data, id) {
    const isVerified = await UserRepository.isVerified(id);
    if(!isVerified) {
      throw new Error('This User has NOT verified the email for register!');
    }

    const { error } = validateCharityRegisterRequest(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const charityData = {
      ...data,
      user: id,
    };

    return await CharityRepository.create(charityData);
  }
}

module.exports = new CharityService();
