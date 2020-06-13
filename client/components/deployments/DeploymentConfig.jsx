/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import syntaxHighlight from '../../utils/yamlSyntaxHighlighting';

const mapStateToProps = ({ clusterData }) => ({
  deployments: clusterData.deployments,
});

function DeploymentConfig(props) {
  const { name } = useParams();
  const { deployments } = props;

  const deployment = deployments.filter((deployment) => deployment.metadata.name === name)[0];
  const currentYaml = JSON.stringify(deployment, null, 4);
  const editDeployment = { ...deployment };
  delete editDeployment.status;
  const editYaml = JSON.stringify(editDeployment, null, 4);

  const handleSubmit = (modifiedYaml) => {
    const newYaml = JSON.stringify(JSON.parse(modifiedYaml));
    console.log('newYaml: ', newYaml);
  };

  useEffect(() => {
    document.querySelector('#currentYaml').innerHTML = syntaxHighlight(currentYaml);
  });

  return (
    <div
      style={{
        width: `calc(100% - 200px)`,
        marginLeft: '200px',
        marginTop: '0',
      }}
    >
      <div id="configHeader">
        <h1>Deployment Configuration Yaml </h1>
        <div id="configBtns">
          <button
            type="submit"
            id="submitBtn"
            onClick={() => handleSubmit(document.querySelector('#editYaml').value)}
          >
            Submit
          </button>
          <Link to="/deployments" style={{ textDecoration: 'none' }}>
            <button type="button" id="backBtn">
              Go Back
            </button>
          </Link>
        </div>
      </div>

      <h2>Deployment name: {name}</h2>

      <div id="yamlContainer">
        <form>
          <h2>{`Modify ${name} configuration here:`}</h2>
          <textarea id="editYaml" defaultValue={editYaml} />
        </form>
        <div>
          <h2> Current Configuration: </h2>
          <div id="currentYaml" />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(DeploymentConfig);
