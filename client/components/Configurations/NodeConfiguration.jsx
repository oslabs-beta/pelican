/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import syntaxHighlight from '../../utils/yamlSyntaxHighlight';
import SubmitButton from '../Buttons/SubmitButton.jsx';

const mapStateToProps = ({ clusterData }) => ({
  clusterData,
  context: clusterData.context,
});

function NodeConfiguration({ clusterData, context }) {
  const [redirect, setRedirect] = useState(false);
  const { name } = useParams();

  const objList = clusterData[context];
  const obj = objList.filter((objects) => objects.metadata.name === name)[0];
  const currentYaml = JSON.stringify(obj, null, 4);
  const editObj = { ...obj };
  delete editObj.status;
  const editYaml = JSON.stringify(editObj, null, 4);

  const handleSubmit = async (modifiedYaml) => {
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
      <div id="yamlContainer">
        <form>
          <h2> Modify Yaml Configuration Here: </h2>
          <textarea
            id="editYaml"
            defaultValue={editYaml}
            onClick={() => handleClick}
          />
          <SubmitButton onClick={handleSubmit} />
        </form>
        <div>
          <h2> Current Configuration: </h2>
          <div id="currentYaml" />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(NodeConfiguration);
