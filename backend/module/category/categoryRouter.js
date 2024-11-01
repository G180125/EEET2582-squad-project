const express = require('express');
const CategoryRouter = express.CategoryRouter();
const { authenticate, authorize } = require("../../middleware/auth");
const UserType = require('../user/enum/userType');
const CategoryController = require('../category/categoryController');

CategoryRouter.get(
    '/all', 
    CategoryController.getAllCategories
);

CategoryRouter.get(
    '/:id', 
    CategoryController.getCategoryById
);

CategoryRouter.post(
    '/:id/subscribe',
    authenticate,
    authorize([UserType.DONOR]), 
    CategoryController.subscribeToCategory
);

CategoryRouter.post(
    '/:id/enable-notifications', 
    authenticate,
    authorize([UserType.DONOR]), 
    CategoryController.enableNotifications
);

module.exports = CategoryRouter;
