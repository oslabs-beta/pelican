const kubernetes = require('../../k8s-client/config');

module.exports = {
  getDeployments: async (req, res, next) => {
    const response = await kubernetes.apis.apps.v1beta1
      .namespaces('default')
      .deployments.get();
    /* pods is an array of pod objects containing
      metadata:(name, namespace, creationTimeStamp
      spec: (volumes, containers, nodeName!, )
      status: (phase [like running etc], conditions, hostIp, podIP, podIPs, startTime, containerStatuses)
       */
    const pods = response.body.items;
    console.log(pods);
    next();
  },
};
