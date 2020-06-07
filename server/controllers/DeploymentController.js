const kubernetes = require('../../k8s-client/config');

module.exports = {
  getDeployments: async (req, res, next) => {
    try {
      const response = await kubernetes.apis.apps.v1beta1.deployments.get();
      /* pods is an array of pod objects containing
      metadata:(name, namespace, creationTimeStamp
      spec: (volumes, containers, nodeName!, )
      status: (phase [like running etc], conditions, hostIp, podIP, podIPs, startTime, containerStatuses)
       */
      console.log(response);
      //   res.locals.deployments = response.body.items;
      //   console.log(res.locals.deployments);
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
