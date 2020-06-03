import React, { Component } from 'react';
import LoginContainer from './containers/LoginContainer';

class App extends Component<{}, {}> {
  render() {
    return (
      <div>
        <div> Hello world </div>
        <LoginContainer />
      </div>
    );
  }
}

export default App;
