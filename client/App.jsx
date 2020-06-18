/* eslint-disable import/extensions */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import MainContainer from './containers/MainContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import './stylesheets/styles.scss';

const mapStateToProps = ({ awsAuth }) => ({
  accessKeyId: awsAuth.accessKeyId,
});
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00a0a0',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function App(props) {
  const { accessKeyId } = props;
  return (
    <Router>
      <div id="main">
        <ThemeProvider theme={darkTheme}>
          <MainContainer />
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(App);
