const kubernetes = require('../../k8s-client/config');

module.exports = {
  getNodes: async (req, res, next) => {
    const response = await kubernetes.api.v1.nodes.get();
    /* pods is an array of pod objects containing
    metadata:(name, namespace, creationTimeStamp
    spec: (volumes, containers, nodeName!, )
    status: (phase [like running etc], conditions, hostIp, podIP, podIPs, startTime, containerStatuses)
     */
    const nodes = response.body.items;
    console.log(nodes);
    next();
  },
};
