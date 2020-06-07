const kubernetes = require('../../k8s-client/config');

module.exports = {
  getNodes: async (req, res, next) => {
    try {
      const response = await kubernetes.api.v1.nodes.get();
      /* pods is an array of pod objects containing
    metadata:(name, namespace, creationTimeStamp
    spec: (volumes, containers, nodeName!, )
    status: (phase [like running etc], conditions, hostIp, podIP, podIPs, startTime, containerStatuses)
     */
      res.locals.nodes = response.body.items;
      console.log(res.locals.nodes);
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
