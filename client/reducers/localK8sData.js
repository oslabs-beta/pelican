import * as types from "../constants/actionTypes";

const initialState = {
  pods: [],
  nodes: {},
  deployments: {},
  services: {},
};

const localK8sData = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PODS:
      return {
        ...state,
        pods: action.payload,
      };
    case types.GET_NODES:
      return {
        ...state,
        nodes: { ...action.payload },
      };
    case types.GET_DEPLOYMENTS:
      return {
        ...state,
        deployments: { ...action.payload },
      };
    case types.GET_SERVICES:
      return {
        ...state,
        services: { ...action.payload },
      };
    default:
      return state;
  }
};

export default localK8sData;
