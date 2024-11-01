const DonorService = require('../donor/donorService');
const UserService = require('../user/userService');
const CategoryRepository = require('./categoryRepository');

class CategoryService {
  async getAllCategories() {
    return await CategoryRepository.getAll();
  }

  async getCategoryById(categoryId) {
    const category = await CategoryRepository.findById(categoryId);
    if (!category) throw new Error("Category not found.");
    return category;
  }

  async subscribeToCategory(categoryId, donorId) {
    const category = await CategoryRepository.findById(categoryId);
    if (!category) throw new Error("Category not found.");

    const donor = await DonorService.getDonorById(donorId);
    const user = await UserService.getUserById(donor.user);
    if (!user) throw new Error("User not found.");

    return await CategoryRepository.subscribeToCategory(categoryId, user.email);
  }

  async enableNotifications(categoryId, donorId) {
    const category = await CategoryRepository.findById(categoryId);
    if (!category) throw new Error("Category not found.");

    return await CategoryRepository.enableNotifications(categoryId, donorId);
  }
}

module.exports = new CategoryService();
