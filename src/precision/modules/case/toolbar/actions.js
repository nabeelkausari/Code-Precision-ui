import * as types from './types'
import {functions} from "../../../api/functions";
import {fetchLinkAs} from "../../../api/helpers";
import {getMaterialLink} from "../../../api/material";
import {setDatasetSelection} from "../../datasets/actions";
import {fromPairs, toPairs} from "ramda";

import {notify} from '../../../utils/notification'

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
    return functions.get()
        .then(payload => dispatch({ type: types.FETCH_FUNCTIONS_SUCCEEDED , payload }))
        .catch(payload => dispatch({ type: types.FETCH_FUNCTIONS_FAILED, payload }))
};

export const suggestFunctions = (query) => (dispatch, getState) => {
    const { functions: { categories, list: { by_uri } } } = getState();
    const categories_by_uri = {...categories.by_uri};
    dispatch({type:types.FETCH_FUNCTION_SUGGESTIONS_REQUESTED})
    return functions
        .getSuggestions(query)
        .then(response => {
            const suggestions = response.map(({ _links: { function: { href } } }) => {
            const function_obj = by_uri[href];
            const parent_category = categories.items
                .filter(category => category.functions.some(function_reference => function_reference === href))
                .shift();
            return {
                // label: name || title,
                // value: href,
                sub_category: parent_category !== undefined ? parent_category.name: 'Unknown category',
                category: parent_category !== undefined ? categories_by_uri[parent_category._links.parent.href].name : '',
                function_obj
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

export const getFunctionParameters = (fx) => (dispatch, getState) => {
    const {functions:{selections}, datasets} = getState();

    if(Object.keys(selections).length === 0) return ;
    let fx_selections_copy = {...selections};

    const solve = {
        "method": "GET",
        "href": "/users/3820/marketplace-courses/1180/solves/1701",
        "accept": "application/vnd.Analyttica.TreasureHunt.UserSolve+json"
    };

    dispatch({type:types.FETCH_FUNCTION_PARAMETERS_REQUESTED});
    return functions
        .getParameters(fx, fx_selections_copy, datasets.selections, solve )
        .then(payload => dispatch({type:types.FETCH_FUNCTION_PARAMETERS_SUCCEEDED,payload}))
        .catch(payload =>  dispatch({type:types.FETCH_FUNCTION_PARAMETERS_FAILED, payload}))
};

export const setColumnSelections = (current_dataset_ref, column) => (dispatch, getState) => {
    const { functions: {selections} }  = getState();
    let current_selections = {...selections};


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


export const setAllColumnSelections = (current_dataset_ref) => (dispatch, getState) => {
    const {datasets: {list: {by_uri}},functions: {selections}} = getState();
    let current_selections = {...selections};
    if(current_selections[current_dataset_ref] === undefined){
        current_selections[current_dataset_ref] = [...by_uri[current_dataset_ref].columns]
    }else{
       delete current_selections[current_dataset_ref]
    }
    dispatch({type:types.SET_COLUMN_SELECTION, payload:current_selections})
};

export const deleteColumnSelection = (current_dataset_ref) => (dispatch, getState) => {

    const { functions: {selections} }  = getState();

    let current_selections = {...selections};

    delete current_selections[current_dataset_ref];

    dispatch({type:types.SET_COLUMN_SELECTION, payload:current_selections})
};

export const formValueMultiChange = (name, value) => (dispatch, getState) => {
    const new_values = value;
    return dispatch(formValueChanged(name, new_values));
};

const formValueChanged = (name, value) => ({
    type: types.SET_FUNCTION_PARAMETERS,
    payload:{name, value}
});


const getTypedValue = (type, value) => {
    switch (type) {
        case 'int':
            const intValue = parseInt(value);
            return isNaN(intValue) ? value : intValue;
        case 'float':
            const floatValue = parseFloat(value);
            return isNaN(floatValue) ? value : floatValue;
        default:
            return value;
    }
};

const validateSpecialCharacters = (value, paramValidation) => {
    return (!(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~\s]/).test(value));
};
const validateBeginingWithNumber = (value, paramValidation) => {
    return !(/^\d/).test(value);
};

const validateParams = (value, paramValidation) => {
    switch (paramValidation.type) {
        case "SPECIAL_CHARACTER":
            return validateSpecialCharacters(value, paramValidation);
        case "START_WITH_NUMBER":
            return validateBeginingWithNumber(value, paramValidation);
        default:
            return true;
    }
};

export const setSelectedFunctionParameters = (name, value) => (dispatch, getState) => {
    const { functions: { parameters, execution } } = getState();
    const { type, multi_select } = parameters.list.filter(p => p.name === name).shift();
    const is_array = type === 'select' && multi_select;
    if (!is_array) {
        if (type !== 'select' && parameters.list.length > 0) {
            const function_params = parameters.list.filter(function_param => function_param.name === name);
            const validations = function_params[0].validations ? function_params[0].validations : [];
            const validationFailed = validations.some(validation => {
                if (!validateParams(value, validation)) {
                    return true;
                }
                return false;
            });
            if (validationFailed) {
                if (!!execution.selected_parameters[name])
                    return;
                return dispatch(formValueChanged(name, ''));
            }
        }
        return dispatch(formValueChanged(name, getTypedValue(type, value)));
    }
    const current_values = parameters[name] || [];
    const new_values = current_values.some(v => v === value)
        ? current_values.filter(v => v !== value)
        : current_values.concat(value);
    return dispatch(formValueChanged(name, new_values));
};

export const cleanHeaders = (selectedDatasets, all_headers) => fromPairs(toPairs(all_headers).filter(([key, value]) => selectedDatasets.indexOf(key) >= 0));


export const executeFunction = () => (dispatch, getState) => {
    dispatch({ type: types.FUNCTION_EXECUTION_REQUESTED });
    const {cases, functions, datasets} = getState();
    const param = {
        selections: functions.selections,
        all_headers: cleanHeaders(datasets.selections, datasets.columns),
        parameters: functions.execution.selected_parameters,
        function_id: functions.execution.current_function.function_id
    };
    return fetchLinkAs(cases.info._links.create_user_step, param)
        .then(payload => dispatch({ type: types.FUNCTION_EXECUTION_SUCCEEDED, payload }))
        .catch(payload => {
            notify("error",payload.message)
        })
};


export const removeSelectedFunctionsAndParameters = () => (dispatch, getState) => {
    dispatch({type:types.UNSET_CURRENT_FUNCTION});
    dispatch({type:types.UNSET_FUNCTION_PARAMETERS});
    dispatch({type:types.UNSET_CURRENT_FUNCTION_CATEGORY});
};

export const setSelectedFunction = (payload) => (dispatch, getState) => {
    dispatch({type:types.SET_CURRENT_FUNCTION, payload});
    dispatch({type:types.SET_PARAMETER_FLYOUT})
};
export const setSelectedFunctionCategory = (payload) => (dispatch, getState) => {
    dispatch({type:types.SET_CURRENT_FUNCTION_CATEGORY, payload});
};
export const closeParameterFlyout = () => (dispatch, getState) => {
    dispatch({type:types.UNSET_PARAMETER_FLYOUT})
};
