const express = require('express');
const NoceController = require('../../controllers/NodeController');
const nodeRouter = express.Router();

nodeRouter.get('/', NodeController.getNodes, (req, res, next) => {
  return res.status(200).json(res.locals.nodes);
});

module.exports = nodeRouter;
