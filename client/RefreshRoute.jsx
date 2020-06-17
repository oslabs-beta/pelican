/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = ({ clusterData }) => ({
  isDataAvailable: clusterData.isDataAvailable,
});

const RefreshRoute = ({
  component: Component,
  isDataAvailable,
  root,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isDataAvailable ? <Component {...props} /> : <Redirect to={`/${root}`} />
    }
  />
);

export default connect(mapStateToProps)(RefreshRoute);
