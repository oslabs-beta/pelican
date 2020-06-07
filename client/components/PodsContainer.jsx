import React, { Component } from "react";
import { connect } from "react-redux";

//import * as actions from "../somewhere";
import Pod from "./PodsPresentational.jsx";

const mapStateToProps = (state) => ({
  stuff: state.things.stuff,
});

const mapDispatchToProps = (dispatch) => ({
  thisFunc: () => dispatch(actions.thisfunc()),
  otherFunc: (param) => dispatch(actions.otherFunc(param)),
  funkyFunc: (paramz) => dispatch(actions.funkyFunc(paramz)),
});

class PodsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="PodsContainer">
        <h4 className="podsTitle">Pods</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Pod Name</th>
              <th>Namespace</th>
              <th>Status</th>
              <th>Pod IP</th>
              <th>Created At</th>
            </tr>
          </thead>
          {pods.map((pod) => {
            <Pod
              name={pod.name}
              namespace={pod.namespace}
              podIP={pod.podIP}
              createdAt={pod.createdAt}
              status={postMessage.status}
            />;
          })}
        </Table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodsContainer);
