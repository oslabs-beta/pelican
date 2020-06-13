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
        type='BallTriangle'
        color='#00BFFF'
        height={'800'}
        width={'800'}
        style={{ marginLeft: '300px' }}
      />
    ) : (
      <Loader
        type='Bars'
        color='#00BFFF'
        height={'300'}
        width={'300'}
        style={{ marginLeft: '300px' }}
      />
    ))
  );
};
export default connect(mapStateToProps)(LoadingIndicator);
