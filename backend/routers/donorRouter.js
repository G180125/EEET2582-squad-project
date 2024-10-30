const express = require('express');
const DonorController = require('../controllers/donorController');
const { authenticate, authorize } = require("../middleware/auth");
const UserType = require('../models/enum/userType');
const donorRouter = express.Router();

donorRouter.get(
    '/all', 
    authenticate,
    authorize([UserType.ADMIN]),
    DonorController.getAllDonors
);

donorRouter.get(
    '/:id', 
    authenticate,
    authorize([UserType.ADMIN, UserType.CHARITY, UserType.DONOR]),
    DonorController.getDonorById
);

donorRouter.get(
    '/myInfo', 
    authenticate,
    authorize([UserType.DONOR]),
    DonorController.getMyInfo
);

donorRouter.put(
    '/:id',
    authenticate,
    authorize([UserType.DONOR]), 
    DonorController.updateDonor
);

module.exports = donorRouter;