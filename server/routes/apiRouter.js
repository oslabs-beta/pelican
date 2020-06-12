const express = require('express');
const podRouter = require('./resourceRoutes/podRouter');
const deploymentRouter = require('./resourceRoutes/deploymentRouter');
const nodeRouter = require('./resourceRoutes/nodeRouter');
const serviceRouter = require('./resourceRoutes/serviceRouter');
const namespaceRouter = require('./resourceRoutes/namespaceRouter');

const apiRouter = express.Router();

apiRouter.use('/pods', podRouter);
apiRouter.use('/nodes', nodeRouter);
apiRouter.use('/deployments', deploymentRouter);
apiRouter.use('/services', serviceRouter);
apiRouter.use('/namespaces', namespaceRouter);

module.exports = apiRouter;
