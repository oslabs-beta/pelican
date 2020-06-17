const client = require('../kubernetes-config');

module.exports = {
  getDeployments: async (req, res, next) => {
    try {
      res.locals.deployments = (
        await client.apis.apps.v1.deployments.get()
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
    try {
      const { name } = req.query;
      const { spec } = req.body;
      const namespace = req.body.namespace || 'default';
      if (spec.replicas < 0) {
        throw new Error('Cannot set a negative replica');
      }
      res.locals.deployment = (
        await client.apis.apps.v1
          .namespaces(namespace)
          .deployments(name)
          .patch({ body: { spec } })
      ).body;
      // console.log(res.locals.deployment);
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
        .put({ body: req.body.config });
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.update: ${err}`,
        status: 500,
        message: 'An error occured updating the deployment',
      });
    }
  },
  createGreenDeployment: async (req, res, next) => {
    const { blueDeploymentConfig, image } = req.body;
    try {
      const greenDeployment = JSON.parse(JSON.stringify(deploymentConfig));
      greenDeployment.metadata.name =
        greenDeployment.metadata.name + '-green' + Date.now().toString(); // can i fix this with a regular expression?
      greenDeployment.spec.selector.matchlabels.greenVersion = Date.now();
      greenDeployment.spec.containers[0].image = image;
      const newGreenDeployment = await res.locals.client.apis.apps.v1
        .namespace('default')
        .deployments({ body: { greenDeployment } });
      res.locals.greenDeploymentName = greenDeployment.name;
      res.locals.podSelector =
        greenDeployment.spec.selector.matchlabels.greenVersion;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.createGreenDeployment: ${err}`,
        status: 500,
        message: 'An error occured creating the green deployment',
      });
    }
  },
};
