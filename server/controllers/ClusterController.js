const kubernetes = require('../../k8s-client/config');

module.exports = {
  getClusters: async (req, res, next) => {
    try {
      const response = await kubernetes.apis.get();
      console.log(response.body);
      res.locals.deployments = response.body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.get: ${err}`,
        status: 400,
        message: 'An error occured fetching deployments',
      });
    }
  },
};
