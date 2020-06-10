import React from 'react';
// import LoginContainer from './containers/LoginContainer';
// import MockShowPods from './containers/MockShowPods.jsx';
// import PodsContainer from './components/PodsContainer.jsx';
import CollapsibleTable from './components/CollapsibleTable.jsx';
import { SideBar, TopBar } from './components/Navbar.jsx';
import './stylesheets/styles.scss';

function App() {
  // return <LoginContainer />;
  // return <MockShowPods />;
  // return <PodsContainer />;
  return (
    <div id="main">
      <TopBar />
      <SideBar />
      <CollapsibleTable />
    </div>
  );
}

export default App;
