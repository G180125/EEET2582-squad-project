const DonorService = require('../services/donorService');

class DonorController {
  // Get a donor by ID
  async getDonorById(req, res) {
    try {
      const { id } = req.params;
      const donor = await DonorService.getDonorById(id);
      res.status(200).json(donor);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Get my info
  async getMyInfo(req, res) {
    try {
      const id = req.id;
      const donor = await DonorService.getDonorById(id);
      res.status(200).json(donor);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Update a donor by ID
  async updateDonor(req, res) {
    try {
      const id = req.id;
      const updatedData = req.body;
      const updatedDonor = await DonorService.updateDonor(id, updatedData);
      res.status(200).json(updatedDonor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all donors
  async getAllDonors(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const results = await DonorService.getAllDonors(page, limit);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DonorController();
