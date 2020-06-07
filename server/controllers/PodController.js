console.log('me');
const kubernetes = require('../../k8s-client/config');
console.log('after');

const PodController = {};

PodController.getPods = async (req, res, next) => {
  console.log('hi');
  const pods = await kubernetes.api.v1.namespaces('default').pods.get();
  console.log(pods);
  next();
};

module.exports = PodController;
