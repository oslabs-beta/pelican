import * as types from '../constants/actionTypes';

const initialState = {
  accessKeyId: '',
  secretAccessKey: '',
};

const awsAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CREDENTIALS:
      return {
        ...state,
        accessKeyId: action.payload.accessKeyId,
        secretAccessKey: action.payload.secretAccessKey,
      };
    default:
      return state;
  }
};

export default awsAuthReducer;
