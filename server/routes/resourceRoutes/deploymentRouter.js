const express = require('express');
const DeploymentController = require('../../controllers/DeploymentController');
const deploymentRouter = express.Router();

deploymentRouter.get(
  '/',
  DeploymentController.getDeployments,
  (req, res, next) => {
    return res.status(200).json(res.locals.deployments);
  }
);

deploymentRouter.patch(
  '/',
  DeploymentController.scaleDeployment,
  (req, res, next) => {
    return res.sendStatus(200);
  }
);

module.exports = deploymentRouter;
