import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  accessKeyId: state.awsAuth.accessKey,
  secretAccessKey: state.awsAuth.secretAccessKey,
});

const mapDispatchToProps = (dispatch) => {};

function MainContainer() {
  return <div> Hello World </div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
