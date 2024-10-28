const DonationService = require('../services/donationService');

const DonationController = {
    async createDonation(req, res) {
        try {
            const donationData = req.body; 
            const donation = await DonationService.createDonation(donationData);
            return res.status(201).json(donation); 
        } catch (error) {
            return res.status(400).json({ message: error.message }); 
        }
    },

    async getAllDonations(req, res) {
        try {
            const donations = await DonationService.getAllDonations();
            return res.status(200).json(donations); 
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred while fetching donations.' }); 
        }
    },

    async getDonationById(req, res) {
        const { id } = req.params;s
        try {
            const donation = await DonationService.getDonationById(id);
            if (!donation) {
                return res.status(404).json({ message: 'Donation not found.' }); 
            }
            return res.status(200).json(donation);
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred while fetching the donation.' }); 
        }
    },

    async getDonorStatistics(req, res) {
        const { userId } = req.id; 
        try {
            const statistics = await DonationService.getDonorStatistics(userId);
            return res.status(200).json(statistics); 
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred while fetching donor statistics.' }); 
        }
    }
};

module.exports = DonationController;
