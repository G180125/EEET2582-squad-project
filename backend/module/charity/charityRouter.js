const express = require('express');
const CharityController = require('./charityController');
const { authenticate, authorize } = require("../../middleware/auth");
const UserType = require('../user/enum/userType');
const CharityRouter = express.Router();

CharityRouter.get(
    '/all', 
    authenticate,
    authorize([UserType.ADMIN]),
    CharityController.getAllCharities
);

CharityRouter.get(
    '/:id', 
    authenticate,
    authorize([UserType.ADMIN, UserType.CHARITY, UserType.DONOR]),
    CharityController.getCharityById
);

CharityRouter.get(
    '/myInfo', 
    authenticate,
    authorize([UserType.CHARITY]),
    CharityController.getMyInfo
);

CharityRouter.put(
    '/:id',
    authenticate,
    authorize([UserType.CHARITY]), 
    CharityController.updateCharity
);

module.exports = CharityRouter;