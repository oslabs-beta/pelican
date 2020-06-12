import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ clusterData }) => ({
  nodes: clusterData.nodes,
});

function NodeConfig(props) {
  const { name } = useParams();
  const { nodes } = props;

  const node = nodes.filter((node) => node.metadata.name === name)[0];
  // function formatYaml(obj, tab = 0) {
  //   let formattedStr = '';
  //   for (let key in obj){
  //     formattedStr +=
  //   }
  // }

  return (
    <div id='tempID'>
      <h1> Node Config! </h1>
      <div> This is the pod name: {name}</div>
      <h2> Node YAML: </h2>
      {/* <div> {str} </div> */}
      <div>{JSON.stringify(node)}</div>
    </div>
  );
}

export default connect(mapStateToProps)(NodeConfig);
