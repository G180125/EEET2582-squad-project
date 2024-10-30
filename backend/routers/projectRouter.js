const express = require('express');
const ProjectController = require('../controllers/projectController');
const { authenticate, authorize } = require("../middleware/auth");
const UserType = require('../models/enum/userType');
const ProjectRouter = express.Router();

ProjectRouter.get(
    '/all', 
    authenticate,
    authorize([UserType.ADMIN]),
    ProjectController.getAllProjects
);

ProjectRouter.get(
    '/active', 
    authenticate,
    authorize([UserType.DONOR]),
    ProjectController.getActiveProjects
);

ProjectRouter.get(
    '/:id', 
    authenticate,
    authorize([UserType.ADMIN, UserType.DONOR, UserType.CHARITY]),
    ProjectController.getProjectById
);

ProjectRouter.get(
    '/my', 
    authenticate,
    authorize([UserType.DONOR, UserType.CHARITY]),
    ProjectController.getMyProjects
);

ProjectRouter.post(
    '/new', 
    authenticate,
    authorize([UserType.ADMIN, UserType.CHARITY]),
    ProjectController.createProject
);

ProjectRouter.put(
    '/:id',
    authenticate,
    authorize([UserType.CHARITY]), 
    ProjectController.updateProject
);

ProjectRouter.patch(
    '/:id/active',
    authenticate,
    authorize([UserType.ADMIN]), 
    ProjectController.activateProject
);

ProjectRouter.patch(
    '/:id/halt',
    authenticate,
    authorize([UserType.CHARITY]), 
    ProjectController.haltProject
);

ProjectRouter.patch(
    '/:id/close',
    authenticate,
    authorize([UserType.CHARITY]), 
    ProjectController.closeProject
);

ProjectRouter.delete(
    '/:id',
    authenticate,
    authorize([UserType.ADMIN]), 
    ProjectController.deleteProject
);

module.exports = ProjectRouter;