/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import syntaxHighlight from '../../utils/yamlSyntaxHighlight';
import DeploymentButton from '../Buttons/DeploymentModal.jsx';
import SubmitButton from '../Buttons/SubmitButton.jsx';
import FormFields from './SelectorsForm.jsx';
import Button from '@material-ui/core/Button';

const mapStateToProps = ({ clusterData }) => ({
  clusterData,
  context: clusterData.context,
  targetNamespace: clusterData.targetNamespace,
});

function ServicesConfiguration({ clusterData, context, targetNamespace }) {
  const [redirect, setRedirect] = useState(false);
  const { name } = useParams();

  const objList = clusterData[context];
  const obj = objList.filter((objects) => objects.metadata.name === name)[0];
  const currentYaml = JSON.stringify(obj, null, 4);
  const editObj = { ...obj };
  delete editObj.status;
  const editYaml = JSON.stringify(editObj, null, 4);

  const specObj = clusterData[context].filter(
    (objects) => objects.metadata.name === name
  )[0];
  const selectObj = specObj.spec.selector;
  //map keys and values onto the form
  const keyArray = Object.keys(selectObj).map((key) => {
    const obj = {};
    obj[key] = selectObj[key];
    return obj;
  });
  const [newKey, setNewKey] = useState(keyArray);

  const handleClick = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };
  const handleSelectorChange = () => {
    const newSelectors = {};
    for (let selector of newKey) {
      newSelectors[Object.keys(selector)[0]] =
        selector[Object.keys(selector)[0]];
    }
    console.log(newSelectors);
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
        width: `calc(100% - 210px)`,
        marginLeft: '210px',
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
          <Link to={`/${context}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
            >
              Go Back
            </Button>
          </Link>
        </div>
      </div>
      <h2>
        {`${context[0]
          .toUpperCase()
          .concat(context.slice(1, context.length - 1))} name: ${name}`}
      </h2>
      <h2>Selectors:</h2> {console.log(selectObj)}
      {keyArray.length
        ? keyArray.map((obj, i) => (
            <FormFields
              key={`selector${i}`}
              value1={Object.keys(obj)[0]}
              value2={obj[Object.keys(obj)[0]]}
              index={i}
              setNewKey={setNewKey}
              newKey={newKey}
            />
          ))
        : null}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSelectorChange()}
      >
        Update Selectors
      </Button>
      <div id="yamlContainer">
        <form>
          <h2> Modify Yaml Configuration Here: {JSON.stringify(newKey)} </h2>
          <textarea
            id="editYaml"
            defaultValue={editYaml}
            onClick={() => handleClick}
          />
          <SubmitButton type="services" namespace={targetNamespace} />
        </form>
        <div>
          <h2> Current Configuration: </h2>
          <div id="currentYaml" />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ServicesConfiguration);
