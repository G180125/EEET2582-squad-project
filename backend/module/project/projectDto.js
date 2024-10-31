const Joi = require('joi');

// Define the schema for create project Request DTO
const createProjectRequestSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  goalAmount: Joi.number().positive().required(),
  raisedAmount: Joi.number().valid(0).required(),
  createdAt: Joi.date().default(Date.now), 
  duration: Joi.string().required(),
  status: Joi.string().valid('pending', 'active').required(),
  charity: Joi.string().required(), 
  region: Joi.string().optional(), 
  country: Joi.string().optional(), 
  category: Joi.string().optional(), 
  account: Joi.string().optional(), 
  image: Joi.array().items(Joi.string()), 
  video: Joi.array().items(Joi.string())  
});

const validateProjectCreationRequest = (projectData) => {
  return createProjectRequestSchema.validate(projectData);
};

module.exports = { validateProjectCreationRequest };
