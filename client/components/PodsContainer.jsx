import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
//import * as actions from "../somewhere";
import { Table } from 'react-bootstrap';
import Pod from './PodsPresentational.jsx';

const mapStateToProps = (state) => ({
  pods: state.localData.pods,
});

const mapStateToDispatch = (dispatch) => ({
  getPods: (data) => dispatch(actions.getPods(data)),
});

class PodsContainer extends Component {
  async componentDidMount() {
    const { getPods } = this.props;
    try {
      const response = await fetch('/api/local/pods');
      console.log('response: ', response);
      const data = await response.json();
      //console.log(data[0]);
      getPods(data);
    } catch (err) {
      console.log('An error occured getting pods: ', err);
    }
  }

  render() {
    const { pods } = this.props;
    console.log('pods?: ', pods);
    return (
      <div className='PodsContainer'>
        <h4 className='podsTitle'>Pods</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Pod Name</th>
              <th>Namespace</th>
              <th>Node</th>
              <th>Status</th>
              <th>Pod IP</th>
              <th>Created At</th>
            </tr>
          </thead>
          {pods.map((pod, i) => {
            return (
              <Pod
                name={pod.metadata.name}
                namespace={pod.metadata.namespace}
                nodeName={pod.spec.nodeName}
                podIP={pod.status.podIP}
                createdAt={pod.metadata.creationTimestamp}
                status={pod.status.phase}
                key={`pod${i}`}
              />
            );
          })}
        </Table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(PodsContainer);
