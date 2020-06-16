module.exports = {
  getDeployments: async (req, res, next) => {
    try {
      res.locals.deployments = (
        await res.locals.client.apis.apps.v1
          .namespaces('default')
          .deployments()
          .get()
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
    if (!req.query.name) {
      return res.sendStatus(400);
    }
    try {
      if (req.body.spec.replicas < 0) {
        throw new Error('Cannot set a negative replica');
      }
      res.locals.deployment = (
        await res.locals.client.apis.apps.v1
          .namespaces('default')
          .deployments(req.query.name)
          .patch({ body: req.body })
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
    try {
      await res.locals.client.apis.apps.v1
        .namespaces('default')
        .deployments(req.query.name)
        .put({ body: req.body });
      next();
    } catch (err) {
      next({
        log: `Encountered an error in PodController.update: ${err}`,
        status: 500,
        message: 'An error occured updating the pod',
      });
    }
  },
};
