const Category = require('./category');

class CategoryRepository {
  async findById(id) {
    return await Category.findById(id);
  }

  async getAll() {
    return await Category.find();
  }

  async subscribeToCategory(categoryId, email) {
    return await Category.findByIdAndUpdate(
      categoryId,
      { $addToSet: { subscriptionList: email } }, 
      { new: true }
    ).populate('subscriptionList'); 
  }

  async enableNotifications(categoryId, donorId) {
    const category = await Category.findById(categoryId);

    // Check if the donor is already subscribed
    if (!category.subscriptionList.includes(donorId)) {
      throw new Error("Donor must be subscribed to enable notifications.");
    }

    // Add donor to notification list if they are subscribed
    return await Category.findByIdAndUpdate(
      categoryId,
      { $addToSet: { notificationList: donorId } },
      { new: true }
    ).populate('notificationList'); 
  }
}

module.exports = new CategoryRepository();
