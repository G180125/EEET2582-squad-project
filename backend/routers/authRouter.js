const express = require("express");
const authRouter = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const UserType = require('../models/enum/userType');
const {
  register,
  login,
  logout,
} = require("../controllers/authController");

authRouter.post("/new", register);

authRouter.post("/new/admin", authenticate, authorize([UserType.ADMIN]), register);

authRouter.post("/login", login);

authRouter.post("/logout", authenticate, logout);

module.exports = authRouter;