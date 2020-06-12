import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ clusterData }) => ({
  services: clusterData.services,
});

function ServiceConfig(props) {
  const { name } = useParams();
  const { services } = props;

  const service = services.filter(
    (service) => service.metadata.name === name
  )[0];
  // function formatYaml(obj, tab = 0) {
  //   let formattedStr = '';
  //   for (let key in obj){
  //     formattedStr +=
  //   }
  // }

  return (
    <div id='tempID'>
      <h1> Service Config! </h1>
      <div> This is the service name: {name}</div>
      <h2> Service YAML: </h2>
      {/* <div> {str} </div> */}
      <div>{JSON.stringify(service)}</div>
    </div>
  );
}

export default connect(mapStateToProps)(ServiceConfig);
