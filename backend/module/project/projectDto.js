const Joi = require('joi');

// Define the schema for create project Request DTO
const createProjectRequestSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  goalAmount: Joi.number().positive().required(),
  duration: Joi.string().required(),
  status: Joi.string().valid('pending', 'active').required(),
  charity: Joi.string().allow(null, ''), 
  // region: Joi.string().allow(null, ''), 
  // country: Joi.string().allow(null, ''),
  // category: Joi.string().allow(null, ''),
  account: Joi.string().optional(), 
  image: Joi.array().items(Joi.string()), 
  video: Joi.array().items(Joi.string())  
});

const validateProjectCreationRequest = (projectData) => {
  return createProjectRequestSchema.validate(projectData);
};

module.exports = { validateProjectCreationRequest };
