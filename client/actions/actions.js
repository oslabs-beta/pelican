import * as types from '../constants/actionTypes';

export const CREATE_CREDENTIAL = (response) => ({
  type: types.CREATE_CREDENTIALS,
  payload: response,
});

export const GET_PODS = (response) => ({
  type: types.GET_PODS,
  payload: response,
});

export const GET_NODES = (response) => ({
  type: types.GET_NODES,
  payload: response,
});

export const GET_DEPLOYMENTS = (response) => ({
  type: types.GET_DEPLOYMENTS,
  payload: response,
});
