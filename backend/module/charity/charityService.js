const CharityRepository = require('./charityRepository');

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
  async getAllCharities(page, limit) {
    const totalCharities = await CharityRepository.count(); 
    const totalPages = Math.ceil(totalCharities / limit);

    const donors = await CharityRepository.getAll(page);

    const isLast = page >= totalPages; 

    return {
      currentPage: page,
      totalPages: Math.ceil(totalCharities / limit),
      pageSize: limit,
      isLast: isLast,
      data: donors 
    };
  }
}

module.exports = new CharityService();
