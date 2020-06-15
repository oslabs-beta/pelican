import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';

const mapStateToProps = ({ appState }) => ({
  firstLoad: appState.firstLoad,
});

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    (props.firstLoad ? (
      <Loader
        type="BallTriangle"
        color="#00BFFF"
        height={'700'}
        width={'700'}
        style={{ marginLeft: '200px' }}
      />
    ) : (
      <div id="loading">
        {' '}
        <Loader
          type="Bars"
          color="#00BFFF"
          height={'100'}
          width={'100'}
          style={{ marginLeft: '200px' }}
        />
        <h1 style={{ color: '#00BFFF', marginLeft: '100px' }}>
          Checking for updates
        </h1>
        <Loader
          type="Bars"
          color="#00BFFF"
          height={'100'}
          width={'100'}
          style={{ marginLeft: '100px' }}
        />
      </div>
    ))
  );
};
export default connect(mapStateToProps)(LoadingIndicator);
