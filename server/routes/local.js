const express = require('express');
const PodController = require('../controllers/PodController');

const localRouter = express.Router();

localRouter.get(
  '/pods',
  (req, res, next) => {
    console.log('in router');
    next();
  },
  PodController.getPods,
  (req, res, next) => {
    res.sendStatus(200);
  }
);

module.exports = localRouter;
