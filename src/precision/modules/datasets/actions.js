import * as types from './types'
import {fetchLinkAs} from "../../api/helpers";
export const selectTable = (payload) => ({ type: types.SELECT_TABLE, payload });

export const getDatasets = (payload) => (dispatch) => {
    dispatch({ type: types.FETCH_DATASET_REQUESTED });
    fetchLinkAs(payload._links.tables_with_columns)
        .then(payload => dispatch({ type: types.FETCH_DATASET_SUCCEEDED, payload }))
        .catch(payload => dispatch({ type: types.FETCH_DATASET_FAILED, payload }))
};

export const selectColumn = (dataset_reference, header) => dispatch => {
    dispatch({type:types.SELECT_COLUMN, payload:{dataset_reference,header}})
};

