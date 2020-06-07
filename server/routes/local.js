const express = require('express');
const PodController = require('../controllers/PodController');
const NodeController = require('../controllers/NodeController');

const localRouter = express.Router();

localRouter.get('/pods', PodController.getPods, (req, res, next) => {
  res.status(200).json(res);
});

localRouter.get('/nodes', NodeController.getNodes, (req, res, next) => {
  res.status(200).json(res);
});

module.exports = localRouter;
