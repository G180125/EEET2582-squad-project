const express = require('express');
const DonorController = require('./donorController');
const { authenticate, authorize } = require("../../middleware/auth");
const UserType = require('../user/enum/userType');

module.exports = (app) => {
    app.get(
        '/all', 
        // authenticate,
        // authorize([UserType.ADMIN]),
        DonorController.getAllDonors
    );
    
    app.get(
        '/:id', 
        authenticate,
        authorize([UserType.ADMIN, UserType.CHARITY, UserType.DONOR]),
        DonorController.getDonorById
    );
    
    app.get(
        '/myInfo', 
        authenticate,
        authorize([UserType.DONOR]),
        DonorController.getMyInfo
    );
    
    app.put(
        '/:id',
        authenticate,
        authorize([UserType.DONOR]), 
        DonorController.updateDonor
    );
}