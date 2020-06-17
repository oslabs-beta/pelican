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
    const { blueDeploymentConfig, image, namespace } = req.body;
    try {
      // make deep copy of old deployment
      const greenDeployment = JSON.parse(JSON.stringify(deploymentConfig));

      // change name of green deployment
      greenDeployment.metadata.name =
        greenDeployment.metadata.name + '-green' + Date.now().toString(); // can i fix this with a regular expression?

      // add new spec selector matchlabel to green deployment
      greenDeployment.spec.selector.matchlabels.greenVersion = Date.now();

      //add that label to the pods themselves
      greenDeployment.spec.template.metadata.labels.greenVersion =
        greenDeployment.spec.selector.matchlabels.greenVersion;

      //change the image of the 0th container
      greenDeployment.spec.containers[0].image = image;

      const newGreenDeployment = await client.apis.apps.v1
        .namespace('default')
        .deployments.post({ body: { greenDeployment } });

      res.locals.greenDeploymentName = newGreenDeployment.name;
      res.locals.podSelector =
        newGreenDeployment.spec.selector.matchlabels.greenVersion;
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
