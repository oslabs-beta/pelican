/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  pods: state.localData.pods,
});

const mapStateToDispatch = (dispatch) => ({
  getPods: (data) => dispatch(actions.getPods(data)),
});

class MockShowPods extends Component {
  componentDidMount() {
    const { getPods } = this.props;
    fetch('/api/local/pods')
      .then((res) => res.json())
      .then((data) => getPods(data));
  }

  render() {
    const { pods } = this.props;
    return (
      <div>
        <div> Hello World! This is Mock Show Pods Component: </div>
        <div> {JSON.stringify(pods)} </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(MockShowPods);
