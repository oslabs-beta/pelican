import * as types from '../constants/actionTypes';

const initialState = {
  firstLoad: true,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case types.FIRST_LOAD:
      return {
        ...state,
        firstLoad: false,
      };
    default:
      return state;
  }
};

export default appState;
