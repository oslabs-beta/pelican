const express = require('express');
const NodeController = require('../../controllers/NodeController');
const nodeRouter = express.Router();

nodeRouter.get('/', NodeController.getNodes, (req, res, next) => {
  return res.status(200).json(res.locals.nodes);
});

nodeRouter.put('/', NodeController.updateNode, (req, res, next) => {
  return res.sendStatus(200);
});

module.exports = nodeRouter;
