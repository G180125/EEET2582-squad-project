const express = require('express');
const DonorController = require('./donorController');
const { authenticate, authorize } = require("../../middleware/auth");
const UserType = require('../user/enum/userType');
const DonorRouter = express.Router();

DonorRouter.post(
    '/new/:id',
    DonorController.createDonor
);

DonorRouter.get(
    '/all', 
    authenticate,
    authorize([UserType.ADMIN]),
    DonorController.getAllDonors
);

DonorRouter.get(
    '/:id', 
    authenticate,
    authorize([UserType.ADMIN, UserType.CHARITY, UserType.DONOR]),
    DonorController.getDonorById
);

DonorRouter.get(
    '/myInfo', 
    authenticate,
    authorize([UserType.DONOR]),
    DonorController.getMyInfo
);

DonorRouter.put(
    '/:id',
    authenticate,
    authorize([UserType.DONOR]), 
    DonorController.updateDonor
);

module.exports = DonorRouter;