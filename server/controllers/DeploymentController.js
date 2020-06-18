const client = require('../kubernetes-config');
const util = require('util');

module.exports = {
  getDeployments: async (req, res, next) => {
    const { name, namespace } = req.query;
    if (name) {
      try {
        res.locals.deployments = (
          await client.apis.apps.v1
            .namespaces(namespace)
            .deployments(name)
            .get()
        ).body;
        next();
      } catch (err) {
        next({
          log: `Encountered an error in DeploymentController.get: ${err}`,
          status: 400,
          message: 'An error occured fetching deployments',
        });
      }
    } else {
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
    const { config } = req.body;
    console.log(config);
    try {
      await client.apis.apps.v1
        .namespaces(namespace)
        .deployments(req.query.name)
        .put({ body: config });
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
    const { newImage, oldYaml, targetNamespace } = req.body;
    try {
      // make deep copy of old deployment without metadata
      const greenDeployment = JSON.parse(
        JSON.stringify({
          spec: oldYaml.spec,
          metadata: {
            name: oldYaml.metadata.name,
            labels: oldYaml.metadata.labels,
          },
        })
      );

      // change name incase this is another green deployment
      const sliceIndex =
        greenDeployment.metadata.name.indexOf('-green') === -1
          ? greenDeployment.metadata.name.length
          : greenDeployment.metadata.name.indexOf('-green');

      // change name of green deployment
      greenDeployment.metadata.name =
        greenDeployment.metadata.name.slice(0, sliceIndex) +
        '-green' +
        Date.now().toString();

      // add new spec selector matchlabel to green deployment
      greenDeployment.spec.selector.matchLabels.greenVersion = Date.now().toString();

      // add that label to the pods themselves
      greenDeployment.spec.template.metadata.labels.greenVersion =
        greenDeployment.spec.selector.matchLabels.greenVersion;

      // change the image of the 0th container
      greenDeployment.spec.template.spec.containers[0].image = newImage;

      const newGreenDeployment = (
        await client.apis.apps.v1
          .namespaces(targetNamespace)
          .deployments.post({ body: greenDeployment })
      ).body;

      res.locals.greenDeploymentName = newGreenDeployment.metadata.name;
      res.locals.podSelector = newGreenDeployment.spec.template.metadata.labels;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.createGreenDeployment: ${err}`,
        status: 500,
        message: 'An error occured creating the green deployment',
      });
    }
  },
  createCanaryDeployment: async (req, res, next) => {
    const { newImage, oldYaml, targetNamespace } = req.body;
    try {
      // make a new deployment yaml changing replicas to one and adding the labels and selectors
      const canaryDeployment = JSON.parse(
        JSON.stringify({
          spec: { ...oldYaml.spec, replicas: 1 },
          metadata: {
            name: oldYaml.metadata.name,
            labels: {
              ...oldYaml.metadata.labels,
              env: 'canary',
            },
          },
        })
      );
      //change label
      canaryDeployment.spec.template.metadata.labels.env = 'canary';

      //edit the name if it has already been canary released
      const sliceIndex =
        canaryDeployment.metadata.name.indexOf('-canary') === -1
          ? canaryDeployment.metadata.name.length
          : canaryDeployment.metadata.name.indexOf('-canary');

      canaryDeployment.metadata.name =
        canaryDeployment.metadata.name.slice(0, sliceIndex) +
        '-canary' +
        Date.now().toString();

      canaryDeployment.spec.template.spec.containers[0].image = newImage;
      const newCanaryDeployment = (
        await client.apis.apps.v1
          .namespaces(targetNamespace)
          .deployments.post({ body: canaryDeployment })
      ).body;

      res.locals.canaryDeploymentName = newCanaryDeployment.metadata.name;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.createCanaryDeployment: ${err}`,
        status: 500,
        message: 'An error occured creating the canary deployment',
      });
    }
    next();
  },
  deleteDeployment: async (req, res, next) => {
    try {
      const { name, namespace } = req.query;
      await client.apis.apps.v1
        .namespaces(namespace)
        .deployments(name)
        .delete();
      next();
    } catch (err) {
      next({
        log: `Encountered an error in DeploymentController.deleteDeployment: ${err}`,
        status: 500,
        message: 'An error occured deleting the deployment',
      });
    }
  },
};
