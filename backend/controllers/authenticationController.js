// authController.js
const User = require('../models/user'); 
const { generateToken, httpStatus } = require('../utils'); 
const { deleteAccessToken } = require("../services/accessTokenService");
const bcrypt = require('bcrypt');

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, phone, address, role, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(httpStatus.BAD_REQUEST().code)
        .json({ error: httpStatus.BAD_REQUEST("USER ALREADY EXISTS").message });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      phone,
      address,
      role,
      password: hashedPassword, 
    });

    await user.save();

    return res
        .status(httpStatus.OK().code)
        .json({ message: `User patient created successfully` });
  } catch (error) {
    return next(err);
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
          .status(httpStatus.BAD_REQUEST().code)
          .json({
            error: httpStatus.BAD_REQUEST("Please provide email and password")
              .message,
          });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res
        .status(httpStatus.UNAUTHORIZED().code)
        .json({ error: httpStatus.UNAUTHORIZED().message });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res
        .status(httpStatus.UNAUTHORIZED().code)
        .json({ error: httpStatus.UNAUTHORIZED("Invalid password").message });
    }

    // Generate an access token
    const accessToken = generateToken(user._id, user.role);
    setCookie(res, accessToken);

    req.role = role;
    req.id = user.patient_id;

    return res
      .status(httpStatus.OK().code)
      .json({ message: "User authenticated", role: role });
  } catch (error) {
    return next(err);
  }
};

// Logout a user
const logout = async (req, res) => {
    try {
        const { accessToken } = req.cookies;

        // Check if the role is valid
        if (accessToken) {
          await deleteAccessToken(accessToken);
        } else {
          return res
            .status(httpStatus.UNAUTHORIZED().code)
            .json({ error: httpStatus.UNAUTHORIZED("Token not found").message });
        }
    
        // Clear the cookie
        res.cookie("accessToken", "", {
          httpOnly: true,
          expires: new Date(0),
        });
    
        return res
          .status(httpStatus.OK().code)
          .json({ message: "User logged out" });
      } catch (err) {
        return next(err);
      }
};

module.exports = {
  register,
  login,
  logout,
};
