import * as types from './types'
import {functions} from "../../../api/functions";
import {fetchLinkAs} from "../../../api/helpers";
import {getMaterialLink} from "../../../api/material";
import {setDatasetSelection} from "../../datasets/actions";




export const getCategoryAndFunctions = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_FUNCTION_CATEGORIES_REQUESTED });
    functions.categories()
        .then(payload => {
            dispatch({ type: types.FETCH_FUNCTION_CATEGORIES_SUCCEEDED, payload });
            dispatch(getFunctions())
        })
        .catch(payload => dispatch({ type: types.FETCH_FUNCTION_CATEGORIES_FAILED, payload }))
};

const getFunctions = () => (dispatch) => {
    dispatch({ type: types.FETCH_FUNCTIONS_REQUESTED });
    functions.get()
        .then(payload => dispatch({ type: types.FETCH_FUNCTIONS_SUCCEEDED , payload }))
        .catch(payload => dispatch({ type: types.FETCH_FUNCTIONS_FAILED, payload }))
};

export const suggestFunctions = (query) => (dispatch, getState) => {
    const { functions: { categories, list: { by_uri } } } = getState();
    const categories_by_uri = categories.by_uri;
    dispatch({type:types.FETCH_FUNCTION_SUGGESTIONS_REQUESTED})
    return functions
        .getSuggestions(query)
        .then(response => {
            const suggestions = response.map(({ _links: { function: { href } } }) => {
            const { name, title } = by_uri[href];
            const parent_category = categories.items
                .filter(category => category.functions.some(function_reference => function_reference === href))
                .shift();
            return {
                label: name || title,
                value: href,
                sub_category: parent_category !== undefined ? parent_category.name: 'Unknown category',
                category: parent_category !== undefined ? categories_by_uri[parent_category._links.parent.href].name : ''
            }
        })
            dispatch({type:types.FETCH_FUNCTION_SUGGESTIONS_SUCCEEDED, payload:suggestions})
        })
        .catch(payload => dispatch({ type: types.FETCH_FUNCTION_SUGGESTIONS_FAILED, payload }))
};


export const getFunctionDescription = (material) => (dispatch, getState) => {
    dispatch({type:types.FETCH_FUNCTION_DESCRIPTION_REQUESTED})
    return fetchLinkAs(getMaterialLink(material.href))
        .then(payload => {
            dispatch({type:types.FETCH_FUNCTION_DESCRIPTION_SUCCEEDED, payload});
        })
        .catch(payload =>  dispatch({type:types.FETCH_FUNCTION_DESCRIPTION_SUCCEEDED, payload}))
};

export const getFunctionParameters = () => (dispatch, getState) => {
    dispatch({type:types.FETCH_FUNCTION_PARAMETERS_REQUESTED})

}

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


