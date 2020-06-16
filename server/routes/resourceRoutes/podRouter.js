const express = require('express');
const PodController = require('../../controllers/PodController');
const podRouter = express.Router();

podRouter.get('/', PodController.getPods, (req, res, next) => {
  return res.status(200).json(res.locals.pods);
});

podRouter.put('/', PodController.updatePod, (req, res, next) => {
  return res.sendStatus(200);
});
module.exports = podRouter;
