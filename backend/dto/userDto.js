const Joi = require('joi');

// Define the schema for User Request DTO
const userRequestSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).required(),
  address: Joi.string().optional().allow(''), 
  role: Joi.string().valid('Donor', 'Charity', 'Admin').required(),
  password: Joi.string().min(8).required(),
  type: Joi.string().valid('individual', 'corporate', 'non-profit')
    .when('role', { is: 'Charity', then: Joi.required() })
    .messages({ 'any.required': 'Type is required for Charity role' }),
  
  description: Joi.string()
    .when('role', { is: 'Charity', then: Joi.required() })
    .messages({ 'any.required': 'Description is required for Charity role' }),
  
  contactInfo: Joi.string()
    .when('role', { is: 'Charity', then: Joi.required() })
    .messages({ 'any.required': 'Contact info is required for Charity role' }) 
});

const validateUserRequest = (userData) => {
  return userRequestSchema.validate(userData);
};

const createUserResponse = (user) => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      type: user.type || null,
      description: user.description || null,
      contactInfo: user.contactInfo || null,
    };
  };

module.exports = { validateUserRequest, createUserResponse };
