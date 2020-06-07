const kubernetes = require('../../k8s-client/config');

module.exports = {
  getPods: async (req, res, next) => {
    const response = await kubernetes.api.v1.namespaces('default').pods.get();
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
