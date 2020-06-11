import React from 'react';
import CollapsibleTable from './components/CollapsibleTable.jsx';
import SideBar, { TopBar } from './components/Navbar.jsx';
import './stylesheets/styles.scss';

function App() {
  return (
    <div id='main'>
      <TopBar />
      <SideBar />
      <CollapsibleTable />
    </div>
  );
}
// <PodsTable />
// <DeploymentsTable />
// <NodesTable />
// <Services />
export default App;
