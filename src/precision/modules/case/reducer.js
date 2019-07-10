import * as types from './types';

const initialState = {
  data_sets: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case types.FETCH_CASE_REQUESTED:
      return { ...state, case_loading: true, fetch_case_error: null, fetch_case_succeeded: null };
    case types.FETCH_CASE_SUCCEEDED:
      return {
        ...state,
        case_loading: false,
        fetch_case_succeeded: true,
        info: payload
    };

    case types.FETCH_CASE_FAILED:
      return { ...state, case_loading: false, fetch_case_succeeded: false, fetch_case_error: payload };

    case types.FETCH_STEPS_REQUESTED:
      return { ...state, steps_loading: true, fetch_steps_error: null, fetch_steps_succeeded: null };
    case types.FETCH_STEPS_SUCCEEDED:
      return { ...state, steps_loading: false, fetch_steps_succeeded: true, steps: payload };
    case types.FETCH_STEPS_FAILED:
      return { ...state, steps_loading: false, fetch_steps_succeeded: false, fetch_steps_error: payload };

    case types.ADD_DATASETS:
      return {
        ...state,
        data_sets: [...state.data_sets, ...payload],
      };

    default:
      return state;
  }
}
