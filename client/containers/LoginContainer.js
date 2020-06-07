import React, { Component } from 'react';
import Login from '../components/Login';
import '../stylesheets/styles.scss';

class LoginContainer extends Component {
  render() {
    return (
      <div id="login-container">
        <Login />
      </div>
    );
  }
}

export default LoginContainer;
