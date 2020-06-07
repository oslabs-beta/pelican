const express = require('express');
const PodController = require('../controllers/PodController');
const NodeController = require('../controllers/NodeController');
const DeploymentController = require('../controllers/DeploymentController');

const localRouter = express.Router();

localRouter.get('/pods', PodController.getPods, (req, res, next) => {
  return res.status(200).json(res.locals.pods);
});

localRouter.get('/nodes', NodeController.getNodes, (req, res, next) => {
  return res.status(200).json(res.locals.nodes);
});

localRouter.get('/deployments', DeploymentController.getDeployments, (req, res, next) => {
  return res.status(200).json(res.locals.deployments);
});

module.exports = localRouter;
