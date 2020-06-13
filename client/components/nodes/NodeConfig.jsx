/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ clusterData }) => ({
  nodes: clusterData.nodes,
});

function NodeConfig(props) {
  const { name } = useParams();
  const { nodes } = props;

  const node = nodes.filter((node) => node.metadata.name === name)[0];
  const nodeYaml = JSON.stringify(node, null, 4);
  const editNode = { ...node };
  delete editNode.status;
  const editYaml = JSON.stringify(editNode, null, 4);

  return (
    <div
      style={{
        width: `calc(100% - 200px)`,
        marginLeft: '200px',
        marginTop: '0',
      }}
    >
      <h1> Node Configuration Yaml </h1>
      <div>
        <b>This is the node name: </b> {name}
      </div>
      <div id="yamlContainer">
        <div id="editYaml"> {editYaml} </div>
        <div id="displayYaml">{nodeYaml}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(NodeConfig);
