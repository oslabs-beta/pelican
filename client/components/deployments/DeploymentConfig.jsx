/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ clusterData }) => ({
  deployments: clusterData.deployments,
});

function DeploymentConfig(props) {
  const { name } = useParams();
  const { deployments } = props;

  const deployment = deployments.filter((deployment) => deployment.metadata.name === name)[0];
  // function formatYaml(obj, tab = 0) {
  //   let formattedStr = '';
  //   for (let key in obj){
  //     formattedStr +=
  //   }
  // }

  return (
    <div id="tempID">
      <h1> Deployment Config! </h1>
      <div> This is the deployment name: {name}</div>
      <h2> Deployment YAML: </h2>
      {/* <div> {str} </div> */}
      <div>{JSON.stringify(deployment)}</div>
    </div>
  );
}

export default connect(mapStateToProps)(DeploymentConfig);
