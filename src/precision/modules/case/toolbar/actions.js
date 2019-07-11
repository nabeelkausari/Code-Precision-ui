import {FUNCTION_CATEGORY_COLLECTION, FUNCTION_COLLECTION, FUNCTION_SUGGESTIONS} from "../../../api/media-types";
import * as types from './types'
import {fetchLinkAs} from "../../../api/helpers";


const links = {
    categories: {
        href: '/function/categories',
        accept: FUNCTION_CATEGORY_COLLECTION,
        method: 'GET'
    },
    functions: {
        href: '/functions',
        accept: FUNCTION_COLLECTION,
        method: 'GET'
    }
};

const getSuggestionsLink = (query) => ({
    href: `/functions/suggestions?query=${query}`,
    accept: FUNCTION_SUGGESTIONS,
    method: 'GET'
});


export const getCategoryAndFunctions = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_FUNCTION_CATEGORIES_REQUESTED });
    fetchLinkAs(links.categories)
        .then(payload => dispatch({ type: types.FETCH_FUNCTION_CATEGORIES_SUCCEEDED, payload }))
        .then(() => {
            const { functions : { fetch_function_categories_succeeded }} = getState();
            if( fetch_function_categories_succeeded ){
                dispatch(getFunctions())
            }
        })
        .catch(payload => dispatch({ type: types.FETCH_FUNCTION_CATEGORIES_FAILED, payload }))
};

export const getFunctions = () => (dispatch) => {
    dispatch({ type: types.FETCH_FUNCTIONS_REQUESTED });
    fetchLinkAs(links.functions)
        .then(payload => dispatch({ type: types.FETCH_FUNCTIONS_SUCCEEDED , payload }))
        .catch(payload => dispatch({ type: types.FETCH_FUNCTIONS_FAILED, payload }))
};


