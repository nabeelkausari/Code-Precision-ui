import * as types from './types';

const initialState = {
    selections:{}
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case types.FETCH_FUNCTION_CATEGORIES_REQUESTED:
            return {
                ...state,
                function_categories_loading: true,
                fetch_function_categories_error: null,
                fetch_function_categories_succeeded: null
            };

        case types.FETCH_FUNCTION_CATEGORIES_SUCCEEDED:
            return {
                ...state,
                function_categories_loading: false,
                fetch_function_categories_succeeded: true,
                categories: payload
            };

        case types.FETCH_FUNCTION_CATEGORIES_FAILED:
            return {
                ...state,
                function_categories_loading: false,
                fetch_function_categories_succeeded: false,
                fetch_function_categories_error: payload
            };

        case types.FETCH_FUNCTIONS_REQUESTED:
            return {
                ...state,
                functions_loading: true,
                fetch_functions_error: null,
                fetch_function_succeeded: null
            };

        case types.FETCH_FUNCTIONS_SUCCEEDED:
            return {
                ...state,
                functions_loading: false,
                fetch_functions_succeeded: true,
                list: payload
            };

        case types.FETCH_FUNCTIONS_FAILED:
            return {
                ...state,
                functions_loading: false,
                fetch_functions_succeeded: false,
                fetch_functions_error: payload
            };

        case types.SET_COLUMN_SELECTION:
            return {
                ...state,
               selections:payload
            };

        default:
            return state;
    }
}
