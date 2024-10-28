// services/userService.js
const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const { validateUserRequest, createUserResponse } = require('../dto/userDto');

class UserService {
  async register(userData) {
    // Validate user request data
    const { error } = validateUserRequest(userData);
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

    const createdUser = await UserRepository.create(newUser);
    return createUserResponse(createdUser); 
  }

  async login(email, password) {
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

    // Generate an access token
    const accessToken = generateToken(user._id, user.role);
    setCookie(res, accessToken);

    return {
      user: createUserResponse(user),
    };
  }
}

module.exports = new UserService();
