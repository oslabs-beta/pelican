import { combineReducers } from 'redux';
import awsAuthReducer from './awsAuthReducer';
import clusterData from './clusterData';
import appState from './appStateReducer';

const reducers = combineReducers({
  awsAuth: awsAuthReducer,
  clusterData: clusterData,
  appState: appState,
});

export default reducers;
