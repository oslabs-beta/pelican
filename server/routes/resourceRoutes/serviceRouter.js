const express = require('express');
const ServiceController = require('../../controllers/ServiceController');
const serviceRouter = express.Router();

apiRouter.get('/', ServiceController.getServices, (req, res, next) => {
  return res.status(200).json(res.locals.services);
});

module.exports = serviceRouter;
