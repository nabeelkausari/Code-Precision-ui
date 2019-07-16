import * as types from './types';

const initialState = {
  data_sets: [],
  results : {
    is_primary_flyout_open : false,
    is_secondary_flyout_open : false
  }
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

    case types.SET_CURRENT_STEP :
      return {
        ...state, results: {
          ...state.results,
          is_primary_step_set: true,
          results1: payload
        }
      };


    case types.SET_PREVIOUS_STEP :
      return {
        ...state,
        results: {
          ...state.results,
          results2: state.results.results1,
          is_secondary_step_set: true
        }
      }

    case types.OPEN_FLYOUT_PRIMARY :
      return {
        ...state,
        results: {
          ...state.results,
          is_primary_flyout_open: true
        }
      }

    case types.CLOSE_FLYOUT_PRIMARY :
      return {
        ...state,
        results: {
          ...state.results,
          is_primary_flyout_open: false,
          results1: undefined,
          is_primary_step_set: false
        }
      }

    case types.OPEN_FLYOUT_SECONDARY :
      return {
        ...state,
        results: {
          ...state.results,
          is_secondary_flyout_open: true
        }
      }

    case types.CLOSE_FLYOUT_SECONDARY :
      return {
        ...state, results: {
          ...state.results,
          is_secondary_flyout_open: false,
          results2: undefined,
          is_secondary_step_set: false
        }
      }


    case types.UNDO_REQUESTED : {
      return{...state, undo_requested : true, undo_error : false }
    }

    case types.UNDO_SUCCEEDED: {
      return{...state, undo_requested : false, undo_error : false, steps : payload}
    }

    case types.UNDO_FAILED : {
      return{...state, undo_requested : false, undo_error : true, error_message : payload }
    }




    case types.REDO_REQUESTED : {
      return{...state, redo_requested : true, redo_error : false }
    }

    case types.REDO_SUCCEEDED: {
      return{...state, redo_requested : false, redo_error : false }
    }

    case types.REDO_FAILED : {
      return{...state, redo_requested : false, redo_error : true, error_message : payload }
    }


    default:
      return state;
  }
}
