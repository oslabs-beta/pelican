const express = require('express');
const ServiceController = require('../../controllers/ServiceController');
const serviceRouter = express.Router();

serviceRouter.get('/', ServiceController.getServices, (req, res, next) => {
  return res.status(200).json(res.locals.services);
});

serviceRouter.put('/', ServiceController.updateService, (req, res, next) => {
  return res.sendStatus(200);
});
module.exports = serviceRouter;
