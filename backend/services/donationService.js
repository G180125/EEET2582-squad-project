const Donation = require('../models/donation');
const Project = require('../models/project');
const sendConfirmationEmail = require('../utils/emailService');
const DonationRepository = require('../repositories/donationRepository'); 
const { validateDonationRequest, createDonationResponse } = require('../dto/donationDto');

const DonationService = {
    async createDonation(donationData) {
        // Validate the donation request data
        const { error } = validateDonationRequest(donationData);
        if (error) {
          throw new Error(error.details[0].message);
        }
    
        // Check if the project is open
        const project = await Project.findById(donationData.project);
        if (!project || project.status !== 'open') {
          throw new Error('The project must be open for donations.');
        }
    
        // Create and save the donation
        const createdDonation = await DonationRepository.create(donationData);
        
        return createDonationResponse(createdDonation);
    },

    async getAllDonations() {
        return await DonationRepository.findAll();
    },
    
    async getDonationById(donationId) {
        return await DonationRepository.findById(donationId);
    },

    async getDonorStatistics(userId) {
        // Aggregate donation statistics for the donor
        const statistics = await Donation.aggregate([
            { $match: { user: userId } }, 
            {
                $group: {
                    _id: null, 
                    totalProjects: { $nunique: "$project" }, 
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        return statistics.length > 0 ? statistics[0] : { totalProjects: 0, totalAmount: 0 };
    }
}

module.exports = DonationService;
