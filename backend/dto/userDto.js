const Joi = require('joi');

// Define the schema for User Request DTO
const registerRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('Admin', 'Donor', 'Charity').required(),
  createdAt: Joi.date().default(Date.now),
});

const validateRegisterRequest = (userData) => {
  return registerRequestSchema.validate(userData);
};

const createUserResponse = (user) => {
  return {
    id: user._id,
    email: user.email,
    role: user.role
  }
}

module.exports = { validateRegisterRequest, createUserResponse };
