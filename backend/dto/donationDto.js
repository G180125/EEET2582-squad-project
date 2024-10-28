const Joi = require('joi');

// Define the schema for Donation Request DTO
const donationRequestSchema = Joi.object({
  user: Joi.string().optional(),
  project: Joi.string().required(), 
  amount: Joi.number().positive().required(), 
  donationDate: Joi.date().optional().allow(null),
  message: Joi.string().optional().allow(''), 
});

// Validation function for donation requests
const validateDonationRequest = (donationData) => {
  return donationRequestSchema.validate(donationData);
};

const createDonationResponse = (donation) => {
    return {
      id: donation._id,
      user: donation.user,
      project: donation.project,
      amount: donation.amount,
      donationDate: donation.donationDate,
      message: donation.message,
    };
  };

module.exports = { validateDonationRequest, createDonationResponse };
