import {FUNCTION_CATEGORY_COLLECTION, FUNCTION_COLLECTION, FUNCTION_SUGGESTIONS} from "../../../api/media-types";
import * as types from './types'
import {fetchLinkAs} from "../../../api/helpers";
import {setDatasetSelection} from "../../datasets/actions";


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
        .then(payload => {
            dispatch({ type: types.FETCH_FUNCTION_CATEGORIES_SUCCEEDED, payload });
            dispatch(getFunctions())
        })
        .catch(payload => dispatch({ type: types.FETCH_FUNCTION_CATEGORIES_FAILED, payload }))
};

const getFunctions = () => (dispatch) => {
    dispatch({ type: types.FETCH_FUNCTIONS_REQUESTED });
    fetchLinkAs(links.functions)
        .then(payload => dispatch({ type: types.FETCH_FUNCTIONS_SUCCEEDED , payload }))
        .catch(payload => dispatch({ type: types.FETCH_FUNCTIONS_FAILED, payload }))
};

export const setColumnSelections = (current_dataset_ref, column) => (dispatch, getState) => {
    const { functions: {selections} }  = getState();
    let current_selections = selections;

    if(current_selections[current_dataset_ref] === undefined) current_selections[current_dataset_ref] = [];

    const columnIndex = current_selections[current_dataset_ref].findIndex(item => item.index === column.index);
    if(columnIndex < 0 ) {
        current_selections[current_dataset_ref].push(column);
    } else{
        current_selections[current_dataset_ref] = current_selections[current_dataset_ref].filter((item) => item.index !== column.index)
    }

    if(current_selections[current_dataset_ref].length === 0) delete current_selections[current_dataset_ref];
    dispatch({type:types.SET_COLUMN_SELECTION, payload:current_selections});
    dispatch(setDatasetSelection());

};

export const deleteColumnSelection = (current_dataset_ref) => (dispatch, getState) => {

    const { functions: {selections} }  = getState();

    let current_selections = selections;

    delete current_selections[current_dataset_ref];

    dispatch({type:types.SET_COLUMN_SELECTION, payload:current_selections})
};


