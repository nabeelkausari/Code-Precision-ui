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
               selections:payload
            };

        default:
            return state;
    }
}
