const CategoryService = require('./categoryService');

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCategoryById(req, res) {
    const id = req.params.id;
    try {
      const category = await CategoryService.getCategoryById(id);
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async subscribeToCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const userId  = req.id;
      const category = await CategoryService.subscribeToCategory(categoryId, userId);
      res.status(200).json({ message: "Subscribed successfully", category });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async enableNotifications(req, res) {
    try {
      const categoryId = req.params.id;
      const userId  = req.id;
      const category = await CategoryService.enableNotifications(categoryId, userId);
      res.status(200).json({ message: "Notifications enabled successfully", category });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CategoryController();
