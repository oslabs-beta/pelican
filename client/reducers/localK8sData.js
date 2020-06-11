import * as types from '../constants/actionTypes';

const initialState = {
  pods: [],
  nodes: [],
  deployments: [],
  services: [],
  namespaces: [],
  display: 'pods',
};

const localK8sData = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PODS:
      return {
        ...state,
        pods: action.payload,
        display: 'pods',
      };
    case types.GET_NODES:
      return {
        ...state,
        nodes: action.payload,
        display: 'nodes',
      };
    case types.GET_DEPLOYMENTS:
      return {
        ...state,
        deployments: action.payload,
        display: 'deployments',
      };
    case types.GET_SERVICES:
      return {
        ...state,
        services: action.payload,
        display: 'services',
      };
    case types.GET_NAMESPACES:
      return {
        ...state,
        namespaces: action.payload,
        display: 'namespaces',
      };
    default:
      return state;
  }
};

export default localK8sData;
