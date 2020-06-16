/* eslint-disable import/extensions */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import './stylesheets/styles.scss';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const mapStateToProps = ({ awsAuth }) => ({
  accessKeyId: awsAuth.accessKeyId,
});

function App(props) {
  const { accessKeyId } = props;
  return (
    <Router>
      <div id="main">
        <MainContainer />
        {/* {accessKeyId ? <MainContainer /> : <LoginContainer />} */}
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(App);
