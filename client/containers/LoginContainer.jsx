import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage.jsx';
import '../stylesheets/styles.css';

function LoginContainer() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </>
  );
}

export default LoginContainer;
