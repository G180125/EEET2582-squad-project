require("dotenv").config();
const UserRepository = require('./userRepository');
const DonorRepository = require('../donor/donorRepository');
const CharityRepository = require('../charity/charityRepository');
const bcrypt = require('bcrypt');
const { validateRegisterRequest } = require('./userDto');
const { validateDonorRegisterRequest } = require('../donor/donorDto');
const { validateCharityRegisterRequest } = require('../charity/charityDto');
const transporter = require('../../utils/mailer');

class UserService {
  async register(userData, requiredData) {
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
    };

    const user = await UserRepository.create(newUser);

    // Map the new user ID into data to create donor or charity
    const roleSpecificData = {
      ...requiredData,
      user: user.id,
    };

    // Create role-specific record
    let roleCreated;
    if (user.role === 'Donor') {
      const { error } = validateDonorRegisterRequest(roleSpecificData);
      if (error) {
        throw new Error(error.details[0].message);
      }

      roleCreated = await DonorRepository.create(roleSpecificData);
    } else if (user.role === 'Charity') {
      const { error } = validateCharityRegisterRequest(roleSpecificData);
      if (error) {
        throw new Error(error.details[0].message);
      }

      roleCreated = await CharityRepository.create(roleSpecificData);
    }

    // Send registration success email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Welcome to Our Platform!',
      text: `Hello ${user.name},\n\nThank you for registering as a ${user.role} on our platform!`,
      html: `<p>Hello ${user.name},</p><p>Thank you for registering as a ${user.role} on our platform!</p>`
    });

    return { user, roleCreated };
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