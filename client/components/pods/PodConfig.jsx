import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ clusterData }) => ({
  pods: clusterData.pods,
});

function PodConfig(props) {
  const { name } = useParams();
  const { pods } = props;

  const pod = pods.filter((pod) => pod.metadata.name === name)[0];
  // function formatYaml(obj, tab = 0) {
  //   let formattedStr = '';
  //   for (let key in obj){
  //     formattedStr +=
  //   }
  // }
  const str = 'hello \nworld';

  return (
    <div id='tempID'>
      <h1> Pod Config! </h1>
      <div> This is the pod name: {name}</div>
      <h2> Pod YAML: </h2>
      {/* <div> {str} </div> */}
      <div>{JSON.stringify(pod)}</div>
    </div>
  );
}

export default connect(mapStateToProps)(PodConfig);
