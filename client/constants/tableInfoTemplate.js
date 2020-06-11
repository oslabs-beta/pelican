export default {
  pods: {
    headers: [
      'Name',
      'Status',
      'Node',
      'Pod IP',
      'Creation Timestamp',
      'Requested CPU',
      'Requested Memory',
      'Namespace',
      '       Edit',
    ],
    columns: [
      'metadata.name',
      'status.phase',
      'spec.nodeName',
      'status.podIP',
      'metadata.creationTimestamp',
      function getCpu(containers) {
        return containers
          .map((container) =>
            Number(
              container.resources.requests.cpu.substring(
                0,
                container.resources.requests.cpu.length - 1
              )
            )
          )
          .reduce((curCpu, totalCpu) => {
            return (totalCpu += curCpu);
          });
      },
    ],
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
      '  Edit',
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
      '  Edit',
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
    headers: [
      'Name',
      'Namespace',
      'Cluster IP',
      'Port',
      'Target Port',
      'Creation Timestamp',
      '  Edit',
    ],
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
