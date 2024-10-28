const express = require("express");
const projectRouter = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const UserType = require('../enums/UserType');
const ProjectController = require('../controllers/projectController');

projectRouter.get(
  "/",
  authenticate,
  authorize[UserType.DONOR], 
  ProjectController.getProjects
);

projectRouter.get(
  "/my",
  authenticate,
  authorize[UserType.CHARITY], 
  ProjectController.getMyProjects
);

router.post(
  '/',
  authenticate,
  authorize[UserType.CHARITY],
  ProjectController.createProject
);

router.put(
  '/:projectId', 
  authenticate,
  authorize[UserType.CHARITY],
  ProjectController.updateProject
);

router.patch(
  '/:projectId/halt', 
  authenticate,
  authorize[UserType.CHARITY],
  ProjectController.haltProject
);

router.patch(
  '/:projectId/resume', 
  authenticate,
  authorize[UserType.CHARITY],
  ProjectController.resumeProject
);

router.delete(
  '/:projectId', 
  authenticate,
  authorize[UserType.CHARITY],
  ProjectController.deleteProject
);

router.get(
  '/statistics', 
  authenticate,
  authorize[UserType.CHARITY],
  ProjectController.getStatistics
);

module.exports = projectRouter;