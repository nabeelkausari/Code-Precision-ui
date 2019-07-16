import * as types from './types';
import {byUri} from "../../../utils/byUri";

const initialState = {
    function_categories_loading: null,
    fetch_function_categories_succeeded: null,
    fetch_function_categories_error: null,
    functions_loading: null,
    fetch_functions_error: null,
    fetch_functions_succeeded: null,
    categories:{
        items:[],
        by_uri:{}
    },
    list:{
        items:[],
        by_uri:{}
    },
    suggestions:{
        items:[],
        fetch_suggestions_loading: null,
        fetch_suggestions_succeeded: null,
        fetch_suggestions_error: null,
    },
    description:{
        info:{},
        fetch_description_loading: null,
        fetch_description_succeeded: null,
        fetch_description_error: null,
    },
    selections:{},
    parameters:{
        list:[],
        fetch_function_parameters_loading: null,
        fetch_function_parameters_succeeded: null,
        fetch_function_parameters_error: null,
    },
    execution:{
        selected_parameters: {},
        current_function:{},
        current_function_category:{},
    },
    parameter_flyout_open: false
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
                categories: {items:payload, by_uri: byUri(payload)}
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
                fetch_functions_succeeded: null
            };

        case types.FETCH_FUNCTIONS_SUCCEEDED:
            return {
                ...state,
                functions_loading: false,
                fetch_functions_succeeded: true,
                list:{items:payload, by_uri: byUri(payload)}
            };

        case types.FETCH_FUNCTIONS_FAILED:
            return {
                ...state,
                functions_loading: false,
                fetch_functions_succeeded: false,
                fetch_functions_error: payload
            };

        case types.FETCH_FUNCTION_SUGGESTIONS_REQUESTED:
            return {
                ...state,
                suggestions: {
                    ...state.suggestions,
                    fetch_suggestions_loading: true,
                }

            };


        case types.FETCH_FUNCTION_SUGGESTIONS_SUCCEEDED:
            return {
                ...state,

                suggestions: {
                    ...state.suggestions,
                    fetch_suggestions_loading: false,
                    fetch_suggestions_succeeded: true,
                    items: payload
                }
            };

        case types.FETCH_FUNCTION_SUGGESTIONS_FAILED:
            return {
                ...state,
                suggestions: {
                    ...state.suggestions,
                    fetch_suggestions_loading: false,
                    fetch_suggestions_succeeded: false,
                    fetch_suggestions_error: payload
                }

            };

        case types.FETCH_FUNCTION_DESCRIPTION_REQUESTED:
            return {
                ...state,
                description: {
                    ...state.description,
                    fetch_description_loading: true
                }

            };

        case types.FETCH_FUNCTION_DESCRIPTION_SUCCEEDED:
            return {
                ...state,
                description: {
                    ...state.description,
                    fetch_description_loading: false,
                    fetch_description_succeeded: true,
                    info:payload
                }
            };

        case types.FETCH_FUNCTION_DESCRIPTION_FAILED:
            return {
                ...state,
                description: {
                    ...state.description,
                    fetch_description_loading: false,
                    fetch_description_error: payload,
                }
            };

        case types.SET_COLUMN_SELECTION:
            return {
                ...state,
               selections: payload
            };

        case types.FETCH_FUNCTION_PARAMETERS_REQUESTED:
            return {
                ...state,
                parameters:{
                    ...state.parameters,
                    fetch_function_parameters_loading: true
                }
            };

        case types.FETCH_FUNCTION_PARAMETERS_SUCCEEDED:
            return {
                ...state,
                parameters:{
                    ...state.parameters,
                    fetch_function_parameters_loading: false,
                    fetch_function_parameters_succeeded: true,
                    list: payload
                }
            };

        case types.FETCH_FUNCTION_PARAMETERS_FAILED:
            return {
                ...state,
                parameters:{
                    ...state.parameters,
                    fetch_function_parameters_loading: false,
                    fetch_function_parameters_error: payload
                }
            };

        case types.SET_CURRENT_FUNCTION:
            return {
                ...state,
                execution:{
                    ...state.execution,
                    current_function: payload
                }
            };

        case types.SET_FUNCTION_PARAMETERS:
            return {
                ...state,
                execution:{
                    ...state.execution,
                    selected_parameters:{
                        ...state.execution.selected_parameters,
                        [payload.name]: payload.value
                    }
                }
            };

        case types.UNSET_CURRENT_FUNCTION:
            return {
                ...state,
                execution:{
                    ...state.execution,
                    current_function:{}
                }
            };

        case types.UNSET_FUNCTION_PARAMETERS:
            return {
                ...state,
                execution:{
                    ...state.execution,
                    selected_parameters:{}
                }
            };

        case types.SET_CURRENT_FUNCTION_CATEGORY:
            return {
                ...state,
                execution:{
                    ...state.execution,
                    current_function_category:payload
                }
            };

        case types.UNSET_CURRENT_FUNCTION_CATEGORY:
            return {
                ...state,
                execution:{
                    ...state.execution,
                    current_function_category:{}
                }
            };

        case types.SET_PARAMETER_FLYOUT:
            return {
                ...state,
                parameter_flyout_open: true
            };

        case types.UNSET_PARAMETER_FLYOUT:
            return {
                ...state,
                parameter_flyout_open: false
            };


        case types.FUNCTION_EXECUTION_REQUESTED:
            return {
                ...state,
                function_execution_loading: true,
                function_execution_failed: null,
                function_execution_succeeded: null
            };


        case types.FUNCTION_EXECUTION_SUCCEEDED:
            return {
                ...state,
                function_execution_loading: false,
                function_execution_failed: null,
                function_execution_succeeded: true,
                items: payload
            };

        case types.FUNCTION_EXECUTION_FAILED:
            return {
                ...state,
                function_execution_loading: false,
                function_execution_succeeded: false,
                function_execution_failed: payload,
            };

        default:
            return state;
    }
}
