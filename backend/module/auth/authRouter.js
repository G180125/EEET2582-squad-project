const express = require("express");
const authRouter = express.Router();
const { authenticate, authorize } = require("../../middleware/auth");
const UserType = require('../user/enum/userType');
const {
  register,
  login,
  logout,
  verifyUser,
} = require("./authController");

authRouter.post("/verify/:id", verifyUser);

authRouter.post("/new", register);

authRouter.post("/new/admin", authenticate, authorize([UserType.ADMIN]), register);

authRouter.post("/login", login);

authRouter.delete("/logout", authenticate, logout);

module.exports = authRouter;