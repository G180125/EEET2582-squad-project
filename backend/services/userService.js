const User = require('../models/user');

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    console.error("Error retrieving user by ID:", err);
    throw err;
  }
};

module.exports = {
  getUserById
};
