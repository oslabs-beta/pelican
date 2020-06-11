import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PodTable from './components/Tables/PodTable.jsx';
import SideBar, { TopBar } from './components/Navbar.jsx';
// import NodeConfig from './components/NodeConfig.jsx';
import PodConfig from './components/configs/PodConfig.jsx';
// import DeploymentConfig from './components/DeploymentConfig.jsx';
// import ServiceConfig from './components/ServiceConfig.jsx';
import './stylesheets/styles.scss';

function App() {
  return (
    <Router>
      <div id='main'>
        <TopBar />
        <SideBar />
        <Switch>
          <Route exact path='/' component={PodTable}></Route>
          <Route path='/pods/:name' component={PodConfig}></Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

/*
function App() {
  return (
    <Router>
      <div id='main'>
        <TopBar />
        <SideBar />
        <Switch>
          <Route exact path='/' component={PodsTable}> </Route>
          <Route exact path='/pods' component={PodsTable}> </Route>
          <Route exact path='/nodes' component={NodesTable}> </Route>
          <Route exact path='/deployments' component={DeploymentsTable}> </Route>
          <Route exact path='/services' component={ServicesTable}> </Route>

          <Route path='/pods/:name' component={PodConfig}
          <Route path='/nodes/:name' component={NodeConfig}
          <Route path='/deployments/:name' component={DeploymentConfig}
          <Route path='/services/:name' component={ServiceConfig}
        </Switch>
      </div>
    </Router>
  );
}
*/

// <PodsTable />
// <DeploymentsTable />
// <NodesTable />
// <Services />
export default App;
