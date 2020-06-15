import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  accessKeyId: state.awsAuth.accessKey,
  secretAccessKey: state.awsAuth.secretAccessKey,
});

function MainContainer() {
  return (
    <div id="main">
      <TopBar />
      <SideBar />
      <CollapsibleTable />
    </div>
  );
}

export default connect(mapStateToProps)(MainContainer);
