const UserService = require('../user/userService');
const { generateToken, setCookie } = require('../../utils'); 
const { deleteAccessToken } = require("./accessTokenService");
const bcrypt = require('bcrypt');

// Register a new user
const register = async (req, res) => {
  try {
    const { newUserData, requiredData} = req.body;
    const newUser = await UserService.register(newUserData, requiredData);
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("BAD_REQUEST: Please provide email and password");
    }

    const { id, role } = await UserService.login(email, password);

    const tokens = await generateToken(id, role);
    setCookie(res, tokens);

    return res.status(200).json("User authenticated successfully");
  } catch (err) {
    return res.status(400).json({ error: err.message });
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
          return res.status(401).json("UNAUTHORIZED: Token not found");
        }
    
        // Clear the cookie
        res.cookie("accessToken", "", {
          httpOnly: true,
          expires: new Date(0),
        });
        
        return res.status(200).json("User logged out successfully");
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
};

module.exports = {
  register,
  login,
  logout,
};
