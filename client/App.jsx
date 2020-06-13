/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SideBar, { TopBar } from './components/Navbar.jsx';
import PodTable from './components/pods/PodTable.jsx';
import NodeTable from './components/nodes/NodeTable.jsx';
import ServiceTable from './components/services/ServiceTable.jsx';
import DeploymentTable from './components/deployments/DeploymentTable.jsx';
import YamlConfiguration from './components/YamlConfigurations.jsx';
import './stylesheets/styles.scss';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

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
          <Route path="/pods/:name" component={YamlConfiguration} />
          <Route path="/nodes/:name" component={YamlConfiguration} />
          <Route path="/deployments/:name" component={YamlConfiguration} />
          <Route path="/services/:name" component={YamlConfiguration} />
          <Route path="*">
            <Redirect to="/pods" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
