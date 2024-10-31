const User = require('./user');

class UserRepository {
  async findById(id) {
    return await User.findById(id);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async create(data) {
    const user = new User(data);
    return await user.save();
  }
}

module.exports = new UserRepository();