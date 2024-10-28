const express = require('express');
const DonationController = require('../controllers/donationController');
const { authenticate, authorize } = require("../middleware/auth");
const UserType = require('../enums/UserType');
const donationRouter = express.Router();

donationRouter.post(
    '/', 
    authenticate,
    DonationController.createDonation);

donationRouter.get(
    '/', 
    authenticate,
    authorize[UserType.CHARITY],
    authorize[UserType.ADMIN],
    DonationController.getAllDonations);

donationRouter.get(
    '/:id', 
    authenticate,
    authorize[UserType.CHARITY],
    DonationController.getDonationById);

donationRouter.get(
    '/statistics',
    authenticate,
    authorize[UserType.DONOR], 
    DonationController.getDonorStatistics);

module.exports = donationRouter;
