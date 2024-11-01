const DonationService = require('../services/donationService');

class DonationController {
  // Get a Donation by ID
  async getDonationById(req, res) {
    try {
      const { id } = req.params;
      const Donation = await DonationService.getDonationById(id);
      res.status(200).json(Donation);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getAllMyDonations(req, res) {
    try {
      const id = req.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const results = await DonationService.getAllDonationsByDonor(id, page, limit);
      res.status(200).json(results);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getAllDonationsByDonor(req, res) {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const results = await DonationService.getAllDonationsByDonor(id, page, limit);
      res.status(200).json(results);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getAllDonationsByProject(req, res) {
    try {
      const id = req.id;
      const role = req.role;
      const projectId = req.params.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const results = await DonationService.getAllDonationsByProject(id, role, projectId, page, limit);
      res.status(200).json(results);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Get all Donations
  async getAllDonations(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const results = await DonationService.getAllDonations(page, limit);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createDonation(req, res) {
    try {
        const donationData = req.body; 
        const userId = req.id; 
  
        const newDonation = await ProjectService.createProject(donationData, userId);
        return res.status(201).json({ message: 'Project created successfully', project: newDonation });
    } catch (err) {
    return res.status(400).json({ error: err.message });
    }
  }
  
}

module.exports = new DonationController();