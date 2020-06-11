import React from 'react';
// import { connect } from 'react-redux';
import CollapsibleTable from '../components/CollapsibleTable.jsx';
import SideBar, { TopBar } from '../components/Navbar.jsx';

// const mapStateToProps = (state) => ({
//   accessKeyId: state.awsAuth.accessKey,
//   secretAccessKey: state.awsAuth.secretAccessKey,
// });

function MainContainer() {
  return (
    <div id="main">
      <TopBar />
      <SideBar />
      <CollapsibleTable />
    </div>
  );
}

export default MainContainer;
// export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
