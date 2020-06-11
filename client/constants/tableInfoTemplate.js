export default {
  pods: {
    headers: ['Name', 'Namespaces', 'Node', 'PodIP', 'Creation Timestamp'],
    columns: ['metadata.namespace', 'spec.nodeName', 'status.podIP', 'metadata.creationTimestamp'],
  },
  nodes: {
    headers: [
      'Name',
      'Internal IP',
      'External IP',
      'Pod CIDR',
      'Allocatable CPU',
      'Capacity CPU',
      'Creation Timestamp',
    ],
    columns: [
      'status.addresses.0.address',
      'status.addresses.1.address',
      'spec.podCIDR',
      'status.allocatable.cpu',
      'status.capacity.cpu',
      'metadata.creationTimestamp',
    ],
  },
  deployments: {
    headers: [
      'Name',
      'Namespace',
      'Desired Replicas',
      'Available Replicas',
      'Updated Replicas',
      'Strategy Type',
    ],
    columns: [
      'metadata.namespace',
      'spec.replicas',
      'status.readyReplicas',
      'status.updatedReplicas',
      'spec.strategy.type',
    ],
  },
  services: {
    headers: ['Name', 'Namespace', 'Cluster IP', 'Port', 'Target Port', 'Creation Timestamp'],
    columns: [
      'metadata.namespace',
      'spec.clusterIP',
      'spec.ports.0.port',
      'spec.ports.0.targetPort',
      'metadata.creationTimestamp',
    ],
  },
  namespaces: {},
};
