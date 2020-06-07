import { combineReducers } from 'redux';
import awsAuthReducer from './awsAuthReducer';

const reducers = combineReducers({
  awsAuth: awsAuthReducer,
});

export default reducers;
