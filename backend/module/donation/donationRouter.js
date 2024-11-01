const express = require('express');
const DonationController = require('../donation/donationController');
const { authenticate, authorize } = require("../../middleware/auth");
const UserType = require('../user/enum/userType');
const DonationRouter = express.DonationRouter();

DonationRouter.get(
    '/:id', 
    authenticate,
    authorize[UserType.ADMIN, UserType.DONOR, UserType.CHARITY],
    DonationController.getDonationById
);

DonationRouter.get(
    '/my', 
    authenticate,
    authorize[UserType.DONOR],
    DonationController.getAllMyDonations
);

DonationRouter.get(
    '/donor/:id', 
    authenticate,
    authorize[UserType.ADMIN],
    DonationController.getAllDonationsByDonor
);

DonationRouter.get(
    '/project/:id', 
    authenticate,
    authorize[UserType.ADMIN],
    DonationController.getAllDonationsByProject
);

DonationRouter.get(
    '/all', 
    DonationController.getAllDonations
);

DonationRouter.post(
    '/', 
    DonationController.createDonation
);

module.exports = DonationRouter;
