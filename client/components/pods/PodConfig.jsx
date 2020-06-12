/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ clusterData }) => ({
  pods: clusterData.pods,
});

function PodConfig(props) {
  const { name } = useParams();
  const { pods } = props;

  const pod = pods.filter((pod) => pod.metadata.name === name)[0];
  const podYaml = JSON.stringify(pod, null, 4);
  const editPod = { ...pod };
  delete editPod.status;
  const editYaml = JSON.stringify(editPod, null, 4);

  return (
    <div
      style={{
        width: `calc(100% - 200px)`,
        marginLeft: '200px',
        marginTop: '0',
      }}
    >
      <h1> Pod Configuration Yaml </h1>
      <div>
        <b>This is the pod name: </b> {name}
      </div>
      <div id="yamlContainer">
        <div id="editYaml"> {editYaml} </div>
        <div id="displayYaml">{podYaml}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(PodConfig);
