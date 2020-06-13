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
  const deploymentYaml = JSON.stringify(deployment, null, 4);
  const editDeployment = { ...deployment };
  delete editDeployment.status;
  const editYaml = JSON.stringify(editDeployment, null, 4);

  return (
    <div
      style={{
        width: `calc(100% - 200px)`,
        marginLeft: '200px',
        marginTop: '0',
      }}
    >
      <h1> Deployment Configuration Yaml </h1>
      <div>
        <b>This is the deployment name: </b> {name}
      </div>
      <div id="yamlContainer">
        <div id="editYaml"> {editYaml} </div>
        <div id="displayYaml">{deploymentYaml}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(DeploymentConfig);
