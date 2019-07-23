import * as types from './types';

const initialState = {
  current_case:{
    reference:"",
    info:{},
    current_scenario:{}
  },
  data_sets: [],

  flyout : {
    primary : {
      step : {},
      code : {

        ath_code : {},
        python_code : {},
        r_code : {},

        fetch_ath_code_loading : null,
        fetch_ath_code_succeeded : null,
        fetch_ath_code_error : null,

        fetch_python_code_loading : null,
        fetch_python_code_succeeded : null,
        fetch_python_code_error : null,

        fetch_r_code_loading : null,
        fetch_r_code_succeeded : null,
        fetch_r_code_error : null,

      },
      notes : {},
      is_open : false,
      is_full_screen : false,
      is_step_set : false
    },

    secondary : {
      step : {},
      code : {
        ath_code : {},
        python_code : {},
        r_code : {},

        fetch_ath_code_loading : null,
        fetch_ath_code_succeeded : null,
        fetch_ath_code_error : null,

        fetch_python_code_loading : null,
        fetch_python_code_succeeded : null,
        fetch_python_code_error : null,

        fetch_r_code_loading : null,
        fetch_r_code_succeeded : null,
        fetch_r_code_error : null,
      },
      notes : {},
      is_open : false,
      is_full_screen : false,
      is_step_set : false
    }
  },
  list:{
    items:[],
    by_uri:{},
    fetch_cases_requested: null,
    fetch_cases_succeeded: null,
    fetch_cases_error: null,
  },
  all_cases:{
    items:[],
    by_uri:{},
    fetch_all_cases_requested: null,
    fetch_all_cases_succeeded: null,
    fetch_all_cases_error: null,
  },
  categories:{
    list:[],
    fetch_case_categories_requested: null,
    fetch_case_categories_succeeded: null,
    fetch_case_categories_error: null,
  },
  create:{
    problem:{},
    create_problem_requested: null,
    create_problem_succeeded: null,
    create_problem_error: null
  },
  recommendations:{
    list:[],
    by_uri:{
    },
    selections:[],
    fetch_case_recommendations_requested: null,
    fetch_case_recommendations_succeeded: null,
    fetch_case_recommendations_error: null
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case types.SAVE_CASE_DETAILS:
      return {
        ...state,
        current_case:{
          ...state.current_case,
          info:payload,

        },
      };
    case types.SAVE_SCENARIO_DETAILS:
      return {
        ...state,
        current_case:{
          ...state.current_case,
          current_scenario: payload
        },
      };

    case types.FETCH_CASE_REQUESTED:
      return { ...state,
        case_loading: true,
        fetch_case_error: null,
        fetch_case_succeeded: null
      };
    case types.FETCH_CASE_SUCCEEDED:
      return {
        ...state,
        case_loading: false,
        fetch_case_succeeded: true,
        info: payload
      };

    case types.FETCH_CASE_FAILED:
      return { ...state, case_loading: false, fetch_case_succeeded: false, fetch_case_error: payload };

    case types.FETCH_CASES_REQUESTED:
      return {
        ...state,
        list:{
          ...state.list,
          fetch_cases_requested: true
        }
      };
    case types.FETCH_CASES_SUCCEEDED:
      return {
        ...state,
        list: {
          ...state.list,
          items: payload,
          // by_uri: byUri(payload),
          fetch_cases_requested: false,
          fetch_cases_succeeded: true
        }
    };

    case types.FETCH_CASES_FAILED:
      return {
        ...state,
        list:{
          ...state.list,
          fetch_cases_requested: false,
          fetch_cases_error: payload
        }
      };
    case types.FETCH_ALL_CASES_REQUESTED:
      return {
        ...state,
        all_cases:{
          ...state.all_cases,
          fetch_all_cases_requested: true
        }
      };
    case types.FETCH_ALL_CASES_SUCCEEDED:
      return {
        ...state,
        all_cases: {
          ...state.all_cases,
          items: payload,
          // by_uri: byUri(payload),
          fetch_all_cases_requested: false,
          fetch_all_cases_succeeded: true
        }
    };

    case types.FETCH_ALL_CASES_FAILED:
      return {
        ...state,
        all_cases:{
          ...state.all_cases,
          fetch_all_cases_requested: false,
          fetch_all_cases_error: payload
        }
      };

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


    case types.SET_CURRENT_STEP:
      return {
        ...state,
        flyout : {
          ...state.flyout,
          primary : {
            ...state.flyout.primary,
            step : payload,
            is_step_set : true,
            is_open: true
          }
        }
      }

    case types.SET_PREVIOUS_STEP:
      return {
        ...state,
        flyout : {
          ...state.flyout,
          secondary : {
            step : state.flyout.primary.step,
            code : state.flyout.primary.code,
            notes : state.flyout.primary.notes,
            is_step_set : true,
            is_open : true
          }
        }
      }

    case types.OPEN_FLYOUT_PRIMARY :
        return {
          ...state,
          flyout : {
            ...state.flyout,
            primary : {
              ...state.flyout.primary,
              is_open : true
            }
          }
        }

    case types.CLOSE_FLYOUT_PRIMARY :
        return {
          ...state,
          flyout : {
            ...state.flyout,
            primary : {
              ...state.flyout.primary,
              is_open : false,
              step : {},
              code : {},
              notes : {}
            }
          }
        }


    case types.OPEN_FLYOUT_SECONDARY :
      return {
        ...state,
        flyout : {
          ...state.flyout,
          secondary : {
            ...state.flyout.secondary,
            is_open : true
          }
        }
      }

      case types.CLOSE_FLYOUT_SECONDARY :
        return {
          ...state,
          flyout : {
            ...state.flyout,
            secondary : {
              ...state.flyout.secondary,
              is_open : false,
              step : {},
              code : {},
              notes : {}
            }
          }
        }


    case types.FETCH_USER_CODE_REQUESTED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            code: {
              ...state.flyout.primary.code,
              fetch_ath_code_loading: true,
              fetch_ath_code_succeeded: null,
              fetch_ath_code_error: null
            }
          }
        }
      }
    }

    case types.FETCH_USER_CODE_SUCCEEDED: {

      return {
        ...state,
        flyout : {
          ...state.flyout,
          primary : {
            ...state.flyout.primary,
            code : {
              ...state.flyout.primary.code,
              fetch_ath_code_loading : false,
              fetch_ath_code_succeeded : true,
              fetch_ath_code_error : false,
              ath_code : payload

            }
          }
        }
      }
    }

    case types.FETCH_USER_CODE_FAILED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            code: {
              ...state.flyout.primary.code,
              fetch_ath_code_loading: false,
              fetch_ath_code_succeeded: false,
              fetch_ath_code_error: true,
              ath_code : {
                error : payload
              }
            }
          }
        }
      }
    }



    case types.FETCH_USER_R_CODE_REQUESTED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            code: {
              ...state.flyout.primary.code,
              fetch_r_code_loading: true,
              fetch_r_code_succeeded: null,
              fetch_r_code_error: null
            }
          }
        }
      }
    }

    case types.FETCH_USER_R_CODE_SUCCEEDED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            code: {
              ...state.flyout.primary.code,
              fetch_r_code_loading: false,
              fetch_r_code_succeeded: true,
              fetch_r_code_error: false,
              r_code : payload
            }
          }
        }
      }
    }

    case types.FETCH_USER_R_CODE_FAILED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            code: {
              ...state.flyout.primary.code,
              fetch_r_code_loading: false,
              fetch_r_code_succeeded: false,
              fetch_r_code_error: true,
              r_code : {
                error : payload
              }
            }
          }
        }
      }
    }

    case types.FETCH_USER_PYTHON_CODE_REQUESTED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            code: {
              ...state.flyout.primary.code,
              fetch_python_code_loading: true,
              fetch_python_code_succeeded: null,
              fetch_python_code_error: null
            }
          }
        }
      }
    }

    case types.FETCH_USER_PYTHON_CODE_SUCCEEDED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            code: {
              ...state.flyout.primary.code,
              fetch_python_code_loading: false,
              fetch_python_code_succeeded: true,
              fetch_python_code_error: false,
              python_code : payload
            }
          }
        }
      }
    }

    case types.FETCH_USER_PYTHON_CODE_FAILED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            code: {
              ...state.flyout.primary.code,
              fetch_python_code_loading: false,
              fetch_python_code_succeeded: false,
              fetch_python_code_error: true,
              python_code : {
                error : payload
              }
            }
          }
        }
      }
    }
      //
      // case types.SET_CURRENT_FLYOUT_TAB: {
      //   return {
      //     ...state,
      //     current_flyout_tab : payload
      //   }
      // }






    case types.UNDO_REQUESTED : {
      return{...state, undo_requested : true, undo_error : false }
    }

    case types.UNDO_SUCCEEDED: {

      return{
        ...state, undo_requested : false, undo_error : false,
        steps : [
            ...state.steps.slice(0, state.steps.length - 2),
            ...payload.slice(payload.length - 1)
            ]
        }
    }

    case types.UNDO_FAILED : {
      return{...state, undo_requested : false, undo_error : true, error_message : payload }
    }




    case types.REDO_REQUESTED : {
      return{...state, redo_requested : true, redo_error : false }
    }

    case types.REDO_SUCCEEDED: {
      return{...state, redo_requested : false, redo_error : false,
      steps : [
          ...state.steps,
          ...payload.slice(payload.length - 1)
      ]}
    }

    case types.REDO_FAILED : {
      return{...state, redo_requested : false, redo_error : true, error_message : payload }
    }



    case types.RESET_REQUESTED : {
      return{...state, reset_requested : true, reset_error : false, reset_succeeded: null }
    }

    case types.RESET_SUCCEEDED: {
      return{...state, reset_requested : false, reset_error : false, reset_succeeded: true }
    }

    case types.RESET_FAILED : {
      return{...state, reset_requested : false, reset_error : true,reset_succeeded: false, error_message : payload }
    }

    case types.ROLLBACK_REQUESTED : {
      return{...state, rollback_requested : true, rollback_error : false, rollback_succeeded: null }
    }

    case types.ROLLBACK_SUCCEEDED: {
      return{...state, rollback_requested : false, rollback_error : false,rollback_succeeded: true }
    }

    case types.ROLLBACK_FAILED : {
      return{...state, rollback_requested : false, rollback_error : true, rollback_succeeded: false, error_message : payload }
    }

    case types.FETCH_CASE_CATEGORIES_REQUESTED : {
      return{
        ...state,
        categories: {
          ...state.categories,
          fetch_case_categories_requested: true
        }
      }
    }

    case types.FETCH_CASE_CATEGORIES_SUCCEEDED : {
      return{
        ...state,
        categories: {
          ...state.categories,
          fetch_case_categories_requested: false,
          fetch_case_categories_succeeded: true,
          list:payload
        }
      }
    }

    case types.FETCH_CASE_CATEGORIES_FAILED : {
      return{
        ...state,
        categories: {
          ...state.categories,
          fetch_case_categories_requested: false,
          fetch_case_categories_error: payload
        }
      }
    }

    case types.CREATE_PROBLEM_REQUESTED : {
      return{
        ...state,
        create:{
          ...state.create,
          create_problem_requested: true,
        }
      }
    }

    case types.CREATE_PROBLEM_SUCCEEDED : {
      return{
        ...state,
        create:{
          ...state.create,
          problem:payload,
          create_problem_requested: false,
          create_problem_succeeded: true
        }
      }
    }

    case types.CREATE_PROBLEM_FAILED : {
      return{
        ...state,
        create:{
          ...state.create,
          create_problem_requested: false,
          create_problem_succeeded: false,
          create_problem_error: payload
        }
      }
    }

    case types.GET_CASE_RECOMMENDATIONS_REQUESTED : {
      return{
        ...state,
        recommendations:{
            fetch_case_recommendations_requested: true,
        }
      }
    }

    case types.GET_CASE_RECOMMENDATIONS_SUCCEEDED : {
      return{
        ...state,
        recommendations:{
          list: payload,
          fetch_case_recommendations_requested: false,
          fetch_case_recommendations_succeeded: true,
        }
      }
    }

    case types.GET_CASE_RECOMMENDATIONS_FAILED : {
      return{
        ...state,
        recommendations:{
          fetch_case_recommendations_requested: false,
          fetch_case_recommendations_succeeded: false,
          fetch_case_recommendations_error: payload,
        }
      }
    }

    case types.SELECT_RECOMMENDATIONS : {
      return{
        ...state,
        recommendations:{
          ...state.recommendations,
          selections:payload
        }
      }
    }

    case types.FETCH_USER_CODE_REQUESTED: {
      return {
        ...state,
        fetch_user_code_loading: true,
        fetch_user_code_succeeded: null,
        fetch_user_code_error: false
      }
    }

    case types.FETCH_USER_CODE_SUCCEEDED: {

      return {
        ...state,
        fetch_user_code_loading: false,
        fetch_user_code_succeeded: true,
        fetch_user_code_error: false,
        code: {
          ...state.code,
          [payload.key]: {
            ...state.code[payload.key],
            'ath': payload
          }
        }
      }
    }

    case types.FETCH_USER_CODE_FAILED: {
      return {
        ...state,
        fetch_user_code_loading: false,
        fetch_user_code_succeeded: false,
        fetch_user_code_error: true,
        user_code_error: payload
      }
    }

    case types.FETCH_USER_R_CODE_REQUESTED: {
      return {
        ...state,
        fetch_user_r_code_loading: true,
        fetch_user_code_succeeded: null,
        fetch_user_code_error: false
      }
    }

    case types.FETCH_USER_R_CODE_SUCCEEDED: {
      return {
        ...state,
        fetch_user_r_code_loading: false,
        fetch_user_r_code_succeeded: true,
        fetch_user_r_code_error: false,
        code: {
          ...state.code,
          [payload.key]: {
            ...state.code[payload.key],
            'r_code': payload
          }
        }
      }
    }

    case types.FETCH_USER_R_CODE_FAILED: {
      return {
        ...state,
        fetch_user_r_code_loading: false,
        fetch_user_r_code_succeeded: false,
        fetch_user_r_code_error: true,
        user_r_code_error: payload
      }
    }

    case types.FETCH_USER_PYTHON_CODE_REQUESTED: {
      return {
        ...state,
        fetch_user_python_code_loading: true,
        fetch_user_python_code_succeeded: null,
        fetch_user_python_code_error: false
      }
    }


    default:
      return state;
    }
  }
