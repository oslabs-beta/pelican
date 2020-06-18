const express = require('express');
const DeploymentController = require('../../controllers/DeploymentController');
const PodController = require('../../controllers/PodController');
const deploymentRouter = express.Router();

deploymentRouter.get(
  '/',
  DeploymentController.getDeployments,
  (req, res, next) => {
    return res.status(200).json(res.locals.deployments);
  }
);

deploymentRouter.put(
  '/scale',
  DeploymentController.scaleDeployment,
  (req, res, next) => {
    return res.status(200).json(res.locals.deployment);
  }
);

deploymentRouter.put(
  '/',
  DeploymentController.updateDeployment,
  (req, res, next) => {
    return res.sendStatus(200);
  }
);

deploymentRouter.post(
  '/bluegreen',
  DeploymentController.createGreenDeployment,
  // PodController.checkGreenPods,
  (req, res, next) => {
    res.status(200).json({
      greenDeploymentName: res.locals.greenDeploymentName,
      podSelectors: res.locals.podSelector,
    });
  }
);

deploymentRouter.post(
  '/canary',
  DeploymentController.createCanaryDeployment,
  (req, res, next) => {
    res.status(200).json(res.locals.canaryDeploymentName);
  }
);

deploymentRouter.delete(
  '/',
  DeploymentController.deleteDeployment,
  (req, res, next) => {
    return res.sendStatus(200);
  }
);
module.exports = deploymentRouter;
