const kubernetes = require('../../k8s-client/config');

module.exports = {
  getNodes: async (req, res, next) => {
    try {
      const response = await kubernetes.api.v1.nodes.get();
      res.locals.nodes = response.body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in NodeController.getNodes: ${err}`,
        status: 400,
        message: 'An error occured fetching nodes',
      });
    }
  },
  getNode: async (req, res, next) => {
    try {
      const response = await kubernetes.api.v1.nodes('minikube').status.get();
      console.log(response);
      next();
    } catch (err) {
      next({
        log: `Encountered an error in NodeController.getNode(name): ${err}`,
        status: 400,
        message: 'An error occured fetching node',
      });
    }
  },
};
