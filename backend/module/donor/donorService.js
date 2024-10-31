const DonorRepository = require('./donorRepository')

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
  async getAllDonors(page, limit) {
    const totalDonors = await DonorRepository.count(); 
    const totalPages = Math.ceil(totalDonors / limit);

    const donors = await DonorRepository.getAll(page);

    const isLast = page >= totalPages; 

    return {
      currentPage: page,
      totalPages: totalPages,
      pageSize: limit,
      isLast: isLast,
      data: donors 
    };
  }
}

module.exports = new DonorService();
