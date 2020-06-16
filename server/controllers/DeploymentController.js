import client from '../kubernetes-config';
module.exports = {
  getDeployments: async (req, res, next) => {
    try {
      res.locals.deployments = (
        await client.apis.apps.v1.deployments().get()
      ).body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.get: ${err}`,
        status: 400,
        message: 'An error occured fetching deployments',
      });
    }
  },
  scaleDeployment: async (req, res, next) => {
    const { name } = req.query;
    const { body } = req.body;
    const namespace = req.body.namespace || 'default';
    try {
      if (req.body.spec.replicas < 0) {
        throw new Error('Cannot set a negative replica');
      }
      res.locals.deployment = (
        await client.apis.apps.v1
          .namespaces(namespace)
          .deployments(name)
          .patch({ body })
      ).body;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.scale: ${err}`,
        status: 500,
        message: 'An error occured scaling the deploymnet',
      });
    }
  },
  updateDeployment: async (req, res, next) => {
    const namespace = req.body.namespace || 'default';
    try {
      await client.apis.apps.v1
        .namespaces(namespace)
        .deployments(req.query.name)
        .put({ body: req.body });
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.update: ${err}`,
        status: 500,
        message: 'An error occured updating the deployment',
      });
    }
  },
};
