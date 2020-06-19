/* eslint-disable import/extensions */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SideBar, { TopBar } from '../components/Navbar.jsx';
import PodTable from '../components/pods/PodTable.jsx';
import NodeTable from '../components/nodes/NodeTable.jsx';
import ServiceTable from '../components/services/ServiceTable.jsx';
import DeploymentTable from '../components/deployments/DeploymentTable.jsx';
import DeploymentConfiguration from '../components/Configurations/DeploymentConfigurations.jsx';
import ServicesConfiguration from '../components/Configurations/ServicesCongifuration.jsx';
import NodeConfiguration from '../components/Configurations/NodeConfiguration.jsx';
import PodConfiguration from '../components/Configurations/PodConfiguration.jsx';
import RefreshRoute from '../RefreshRoute.jsx';

const mapStateToProps = ({ awsAuth }) => ({
  accessKeyId: awsAuth.accessKey,
});

function MainContainer() {
  return (
    <>
      <TopBar />
      <SideBar />
      <Switch>
        <Route exact path="/pods" component={PodTable} />
        <Route exact path="/nodes" component={NodeTable} />
        <Route exact path="/deployments" component={DeploymentTable} />
        <Route exact path="/services" component={ServiceTable} />
        <RefreshRoute
          path="/pods/:name"
          component={PodConfiguration}
          root="pods"
        />
        <RefreshRoute
          path="/nodes/:name"
          component={NodeConfiguration}
          root="nodes"
        />
        <RefreshRoute
          path="/deployments/:name"
          component={DeploymentConfiguration}
          root="deployments"
        />
        <RefreshRoute
          path="/services/:name"
          component={ServicesConfiguration}
          root="services"
        />
        <Route path="*">
          <Redirect to="/pods" />
        </Route>
      </Switch>
    </>
  );
}

export default connect(mapStateToProps)(MainContainer);
