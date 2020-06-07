import { combineReducers } from 'redux';
import awsAuthReducer from './awsAuthReducer';
import localK8sData from './localK8sData';

const reducers = combineReducers({
  awsAuth: awsAuthReducer,
  localData: localK8sData,
});

export default reducers;
