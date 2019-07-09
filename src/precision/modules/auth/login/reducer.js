import * as types from './types';

const initialState = {
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case types.LOGIN_REQUESTED:
      return { ...state, loginLoading: true, loginError: null, loginSuccess: null };
    case types.LOGIN_SUCCEEDED:
      return { ...state, loginLoading: false, loginSuccess: true, ...payload };
    case types.LOGIN_FAILED:
      return { ...state, loginLoading: false, loginSuccess: false, loginError: payload };

    default:
      return state;
  }
}
