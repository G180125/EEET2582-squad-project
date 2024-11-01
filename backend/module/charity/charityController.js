const CharityService = require('./charityService');

class CharityController {
  // Get a Charity by ID
  async getCharityById(req, res) {
    try {
      const { id } = req.params;
      const Charity = await CharityService.getCharityById(id);
      res.status(200).json(Charity);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Get my info
  async getMyInfo(req, res) {
    try {
      const id = req.id;
      const Charity = await CharityService.getCharityById(id);
      res.status(200).json(Charity);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Update a Charity by ID
  async updateCharity(req, res) {
    try {
      const id = req.id;
      const updatedData = req.body;
      const updatedCharity = await CharityService.updateCharity(id, updatedData);
      res.status(200).json(updatedCharity);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all Charities
  async getAllCharities(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
        search: req.query.search,
        type: req.query.type,
      };
      const results = await CharityService.getAllCharities(page, limit, filters);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createCharity(req, res) {
    try {
      const id = req.params.id;
      const data = req.body.data;
      const results = await CharityService.createCharity(data, id);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CharityController();
