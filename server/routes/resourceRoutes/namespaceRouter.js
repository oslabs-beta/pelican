const express = require('express');
const NamespaceController = require('../../controllers/NamespaceController');
const namespaceRouter = express.Router();

namespaceRouter.get(
  '/',
  NamespaceController.getNamespaces,
  (req, res, next) => {
    return res.status(200).json(res.locals.namespaces);
  }
);

module.exports = namespaceRouter;
