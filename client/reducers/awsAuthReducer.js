import * as types from '../constants/actionTypes';

const initialState = {
  accessKeyId: 'temp',
  secretAccessKey: '',
  region: '',
};

const awsAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CREDENTIALS:
      return {
        ...state,
        accessKeyId: action.payload.accessKeyId,
        secretAccessKey: action.payload.secretAccessKey,
        region: action.payload.region,
      };
    default:
      return state;
  }
};

export default awsAuthReducer;
