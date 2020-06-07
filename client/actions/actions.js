import * as types from '../constants/actionTypes';

const CREATE_CREDENTIAL = (response) => ({
  type: types.CREATE_CREDENTIALS,
  payload: response,
});

export default CREATE_CREDENTIAL;
