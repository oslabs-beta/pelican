/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import syntaxHighlight from '../../utils/yamlSyntaxHighlight';
import DeploymentButton from '../Buttons/DeploymentModal.jsx';
import FormFields from './ImagesForm.jsx';

const mapStateToProps = ({ clusterData }) => ({
  clusterData,
  context: clusterData.context,
});

function YamlConfiguration({ clusterData, context }) {
  const [redirect, setRedirect] = useState(false);
  const { name } = useParams();
  const objList = clusterData[context];
  const obj = objList.filter((obj) => obj.metadata.name === name)[0];
  const currentYaml = JSON.stringify(obj, null, 4);
  const editObj = { ...obj };
  delete editObj.status;
  const editYaml = JSON.stringify(editObj, null, 4);

  const handleSubmit = async (modifiedYaml) => {
    console.log('hiii');
    const config = JSON.parse(modifiedYaml);
    try {
      const result = await fetch(
        `/api/deployments?name=${config.metadata.name}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config),
        }
      );
      setRedirect(true);
    } catch (err) {
      console.log("Couldn't update the deployment");
    }
  };

  const handleClick = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  useEffect(() => {
    document.querySelector('#currentYaml').innerHTML = syntaxHighlight(
      currentYaml
    );
  }, []);

  return redirect ? (
    <Redirect to="/deployments" />
  ) : (
    <div
      style={{
        width: `calc(100% - 200px)`,
        marginLeft: '200px',
        marginTop: '0',
      }}
    >
      <div id="configHeader">
        <h1>
          {`${context[0]
            .toUpperCase()
            .concat(context.slice(1, context.length - 1))} Configuration Yaml`}
        </h1>
        <div id="configBtns">
          <button
            type="submit"
            id="submitBtn"
            onClick={() =>
              handleSubmit(document.querySelector('#editYaml').value)
            }
          >
            Submit
          </button>
          <Link to={`/${context}`} style={{ textDecoration: 'none' }}>
            <button type="button" id="backBtn">
              Go Back
            </button>
          </Link>
        </div>
      </div>

      <h2>
        {`${context[0]
          .toUpperCase()
          .concat(context.slice(1, context.length - 1))} name: ${name}`}
      </h2>
      <h3>Images:</h3>
      <FormFields />
      <DeploymentButton />
      <div id="yamlContainer">
        <form>
          <h2> Modify Yaml Configuration Here: </h2>
          <textarea
            id="editYaml"
            defaultValue={editYaml}
            onClick={() => handleClick}
          />
        </form>
        <div>
          <h2> Current Configuration: </h2>
          <div id="currentYaml" />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(YamlConfiguration);
