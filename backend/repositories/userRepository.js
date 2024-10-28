const User = require('../models/user');

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async create(data) {
    const user = new User(data);
    return await user.save();
  }
}

module.exports = new UserRepository();
