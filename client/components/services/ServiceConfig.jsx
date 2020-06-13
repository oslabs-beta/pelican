/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ clusterData }) => ({
  services: clusterData.services,
});

function ServiceConfig(props) {
  const { name } = useParams();
  const { services } = props;

  const service = services.filter((service) => service.metadata.name === name)[0];
  const serviceYaml = JSON.stringify(service, null, 4);
  const editService = { ...service };
  delete editService.status;
  const editYaml = JSON.stringify(editService, null, 4);

  return (
    <div
      style={{
        width: `calc(100% - 200px)`,
        marginLeft: '200px',
        marginTop: '0',
      }}
    >
      <h1> Service Configuration Yaml </h1>
      <div>
        <b>This is the service name: </b> {name}
      </div>
      <div id="yamlContainer">
        <div id="editYaml"> {editYaml} </div>
        <div id="displayYaml">{serviceYaml}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ServiceConfig);
