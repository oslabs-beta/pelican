import * as types from '../constants/actionTypes';

const initialState = {
  pods: {},
  nodes: {},
  deployments: {},
};

const awsClustersData = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PODS:
      return {
        ...state,
        pods: { ...action.payload },
      };
    case types.GET_NODES:
      return {
        ...state,
        pods: { ...action.payload },
      };
    case types.GET_DEPLOYMENTS:
      return {
        ...state,
        pods: { ...action.payload },
      };
    default:
      return state;
  }
};

export default awsClustersData;
