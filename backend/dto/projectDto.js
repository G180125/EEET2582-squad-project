const Joi = require('joi');

// Define the schema for Project Request DTO
const projectRequestSchema = Joi.object({
  charity: Joi.string().required(),
  status: Joi.string().valid('open', 'closed', 'halted').required(),
  type: Joi.string().valid('global', 'local').required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  goalAmount: Joi.number().required(),
  duration: Joi.string().required(),
  sector: Joi.string().optional(),
  account: Joi.string().required()
});

// Validation function for project request data
const validateProjectRequest = (requestData) => {
  return projectRequestSchema.validate(requestData);
};

// Response format function for project creation
const createProjectResponse = (project) => {
  return {
    id: project._id,
    name: project.name,
    type: project.type,
    description: project.description,
    goalAmount: project.goalAmount,
    raisedAmount: project.raisedAmount,
    createdAt: project.createdAt,
    duration: project.duration,
    status: project.status,
    charity: project.charity,
    account: project.account
  };
};

module.exports = { validateProjectRequest, createProjectResponse };
