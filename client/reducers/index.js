import { combineReducers } from 'redux';
import awsAuthReducer from './awsAuthReducer';
import clusterData from './clusterData';

const reducers = combineReducers({
  awsAuth: awsAuthReducer,
  clusterData: clusterData,
});

export default reducers;
