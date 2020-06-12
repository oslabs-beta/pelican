import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div id='main'>
        <TopBar />
        <SideBar />
        <Switch>
          <Route exact path='/' component={PodTable}></Route>
          <Route exact path='/pods' component={PodTable}></Route>
          <Route exact path='/nodes' component={NodeTable}></Route>
          <Route exact path='/deployments' component={DeploymentTable}></Route>
          <Route exact path='/services' component={ServiceTable}></Route>
          <Route path='/pods/:name' component={PodConfig}></Route>
          <Route path='/nodes/:name' component={NodeConfig}></Route>
          <Route path='/deployments/:name' component={DeploymentConfig}></Route>
          <Route path='/services/:name' component={ServiceConfig}></Route>
          <Route path='*'>
            <Redirect to='/pods' />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
