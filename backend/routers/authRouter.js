const express = require("express");
const authRouter = express.Router();
const { authenticate, authorize } = require("../middleware/auth");

const {
  register,
  login,
  logout,
} = require("../controllers/authController");

authRouter.post("/new", register);

authRouter.post("/login", login);

authRouter.delete("/logout", authenticate, logout);

module.exports = authRouter;