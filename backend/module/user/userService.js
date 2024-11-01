require("dotenv").config();
const UserRepository = require('./userRepository');
const bcrypt = require('bcrypt');
const { validateRegisterRequest } = require('./userDto');
const { sendVerifyEmail } = require('../../utils/sendMail');

class UserService {
  async register(userData) {
    // Validate user request data
    const { error } = validateRegisterRequest(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Check if the user already exists
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user
    const newUser = {
      ...userData,
      password: hashedPassword,
      isVerified: false,
      createAt: Date.now,
    };

    const user = await UserRepository.create(newUser);
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send registration success email
    await sendVerifyEmail(user.email, OTP)

    return { user: user, OTP: OTP };
  }

  async verifyUser(id) {
    return await UserRepository.update(id, { isVerified: 'true' });
  }

  async isVerified(id) {
    return await UserRepository.isVerified(id);
  }

  async login(email, password, res) {
    // Find the user by email
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not Found');
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    return {
      id: user.id,
      role: user.role
    };
  }

  async getUserById(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = new UserService();