const DonationRepository = require('../repositories/donationRepository');
const ProjectRepository = require('../project/projectRepository');

class DonationService {
  // Method to get all donations with pagination
  async getAllDonations(page, limit) {
    const totalDonations = await DonationRepository.count();
    const totalPages = Math.ceil(totalDonations / limit);
    const donations = await DonationRepository.getAll(page, limit);
    const isLast = page >= totalPages;

    return {
      currentPage: page,
      totalPages,
      pageSize: limit,
      isLast: isLast,
      data: donations,
    };
  }

  // Method to get all donations by a specific donor with pagination
  async getAllDonationsByDonor(donorId, page, limit) {
    const totalDonationsByDonor = await DonationRepository.countByDonor(donorId);
    const totalPages = Math.ceil(totalDonationsByDonor / limit);
    const donations = await DonationRepository.getAllByDonor(donorId, page, limit);
    const isLast = page >= totalPages;

    return {
      currentPage: page,
      totalPages,
      pageSize: limit,
      isLast: isLast,
      data: donations,
    };
  }

  // Method to get all donations for a specific project with pagination
  async getAllDonationsByProject(id, role, projectId, page, limit) {
    if (role != 'Admin'){
        const project = await ProjectRepository.findById(projectId);
        if (!project.charity === id){
            throw new Error('You don\'t have the access to these data');
        }
    }

    const totalDonationsByProject = await DonationRepository.countByProject(projectId);
    const totalPages = Math.ceil(totalDonationsByProject / limit);
    const donations = await DonationRepository.getAllByProject(projectId, page, limit);
    const isLast = page >= totalPages;

    return {
      currentPage: page,
      totalPages,
      pageSize: limit,
      isLast: isLast,
      data: donations,
    };
  }

  // Method to get a donation by ID
  async getDonationById(donationId) {
    const donation = await DonationRepository.findById(donationId);
    if (!donation) {
      throw new Error('Donation not found');
    }
    return donation;
  }

  // Method to create a new donation
  async createDonation(donationData) {
    return await DonationRepository.create(donationData);
  }
}

module.exports = new DonationService();
