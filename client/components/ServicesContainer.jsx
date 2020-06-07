import React, { Component } from "react";
import { connect } from "react-redux";
//import * as actions from "../somewhere";
import Service from "./ServicesPresentational.jsx";

const mapStateToProps = (state) => ({
  stuff: state.things.stuff,
});

const mapDispatchToProps = (dispatch) => ({
  thisFunc: () => dispatch(actions.thisfunc()),
  otherFunc: (param) => dispatch(actions.otherFunc(param)),
  funkyFunc: (paramz) => dispatch(actions.funkyFunc(paramz)),
});

class ServicesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="servicesContainer">
        <h4 className="servicesHeader">Services</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Type</th>
              <th>Namespace</th>
              <th>Port</th>
              <th>Cluster IP</th>
            </tr>
          </thead>
          {Services.map((service) => {
            <Service
              name={service.name}
              type={service.type}
              namespace={service.namespace}
              Port={service.port}
              clusterIP={service.clusterIP}
            />;
          })}
        </Table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesContainer);
