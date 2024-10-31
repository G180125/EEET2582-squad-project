const express = require("express");
const authRouter = express.Router();
const { authenticate, authorize } = require("../../middleware/auth");
const UserType = require('../user/enum/userType');
const {
  register,
  login,
  logout,
} = require("./authController");

authRouter.post("/new", register);

authRouter.post("/new/admin", authenticate, authorize([UserType.ADMIN]), register);

authRouter.post("/login", login);

authRouter.delete("/logout", authenticate, logout);

module.exports = authRouter;