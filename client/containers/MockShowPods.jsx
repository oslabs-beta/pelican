/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

const mapStateToProps = (state) => ({
  pods: state.localData.pods,
});

const mapStateToDispatch = (dispatch) => ({
  getPods: (data) => dispatch(actions.getPods(data)),
});

class MockShowPods extends Component {
  async componentDidMount() {
    const { getPods } = this.props;
    try {
      const response = await fetch("/api/local/pods");
      console.log("response: ", response);
      const data = await response.json();
      //console.log(data[0]);
      getPods(data);
    } catch (err) {
      console.log("An error occured: ", err);
    }
  }

  render() {
    const { pods } = this.props;
    console.log("this PODS: ", pods[0]);
    return (
      <div>
        <div> Hello World! This is Mock Show Pods Component: </div>
        <div> {JSON.stringify(pods)} </div>
        <div>
          {/* {pods.map((pod) => (
              <p>{pod.name}</p> */}
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(MockShowPods);
