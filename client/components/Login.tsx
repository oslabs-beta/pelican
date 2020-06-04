import React, { Component } from 'react';

class Login extends Component<{}, {}> {
  render() {
    return (
      <div id="login">
        <div id="app-name">
          <h1> finch </h1>
        </div>

        <form id="form">
          <div id="aws-logo">{/* <img src="../assets/aws-logo.png"> </img> */}</div>

          <div>
            <label htmlFor="username"> Username: </label>
            <input id="inputUser" type="text" name="username" required />
          </div>

          <div>
            <label htmlFor="password"> Password: </label>
            <input id="inputPass" type="password" name="password" required />
          </div>

          <div>
            <p> Forget your password? </p>
            <input id="login-button" type="submit" value="Log in" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
