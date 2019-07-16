import * as types from './types'
import {fetchLinkAs} from "../../api/helpers";
export const selectTable = (payload) => ({ type: types.SELECT_TABLE, payload });

export const getDatasets = (payload) => (dispatch) => {
    dispatch({ type: types.FETCH_DATASET_REQUESTED });
    return fetchLinkAs(payload._links.tables_with_columns)
        .then(payload => dispatch({ type: types.FETCH_DATASET_SUCCEEDED, payload }))
        .catch(payload => dispatch({ type: types.FETCH_DATASET_FAILED, payload }))
};

export const selectColumn = (dataset_reference, header) => dispatch => {
    dispatch({type:types.SELECT_COLUMN, payload:{dataset_reference,header}})
};

export const setDatasetSelection = () => (dispatch, getState) => {
    const {functions, datasets} = getState();
    let column_selections = functions.selections;
    let dataset_selections ={};

    for(let key in column_selections){
        dataset_selections[key] = {
            name: datasets.list.by_uri[key].name,
            uri: datasets.list.by_uri[key].datasetPath
        }
    }
    dispatch({type:types.SET_DATASET_SELECTIONS, payload:dataset_selections})
};
