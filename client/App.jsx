/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SideBar, { TopBar } from './components/Navbar.jsx';
import PodTable from './components/pods/PodTable.jsx';
import NodeTable from './components/nodes/NodeTable.jsx';
import ServiceTable from './components/services/ServiceTable.jsx';
import DeploymentTable from './components/deployments/DeploymentTable.jsx';
import PodConfig from './components/pods/PodConfig.jsx';
import NodeConfig from './components/nodes/NodeConfig.jsx';
import ServiceConfig from './components/services/ServiceConfig.jsx';
import DeploymentConfig from './components/deployments/DeploymentConfig.jsx';
import './stylesheets/styles.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  return (
    <Router>
      <div id="main">
        <TopBar />
        <SideBar />
        <Switch>
          <Route exact path="/" component={PodTable} />
          <Route exact path="/pods" component={PodTable} />
          <Route exact path="/nodes" component={NodeTable} />
          <Route exact path="/deployments" component={DeploymentTable} />
          <Route exact path="/services" component={ServiceTable} />
          <Route path="/pods/:name" component={PodConfig} />
          <Route path="/nodes/:name" component={NodeConfig} />
          <Route path="/deployments/:name" component={DeploymentConfig} />
          <Route path="/services/:name" component={ServiceConfig} />
          <Route path="*">
            <Redirect to="/pods" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
