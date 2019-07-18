import * as types from './types'
import {fetchLink, fetchLinkAs} from "../../api/helpers";
import Papa from "papaparse";


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


export const fetchStepDetailsCsv = (csv) => (dispatch) => {
    dispatch({type: types.FETCH_DATASET_CSV_REQUESTED});
    Papa.parse(csv || "", {
        download: true,
        complete: (results) => {
            let headers = results.data[0];
            let rows = [...results.data.splice(1, results.data.length)];
            rows = rows
                .map(row => row[0].split(';'))
                .filter(row => row.length !== headers.length)

            let payload = {
                csvData: headers[0].split(';'),
                headerRow: rows
            };
            dispatch({type: types.FETCH_DATASET_CSV_SUCCEEDED, payload})
        }
    });
};


export const getUploadLink = () => (dispatch)  => {
    dispatch({ type: types.FETCH_UPLOAD_LINK_REQUESTED });
    fetchLink({href: '/course/upload', type: "application/json", accept: 'application/json'})
        .then((res) => res.json())
        .then((result) => {
            const payload = {
                uploadLink: result.file_upload_url,
                sampleCSVLink: result.sample_data_url,
                deleteLink: result.delete_dataset_file
            };
            dispatch({ type: types.FETCH_UPLOAD_LINK_SUCCEEDED, payload})
        })
        .catch(payload => dispatch({ type: types.FETCH_UPLOAD_LINK_FAILED, payload }))
};


export const createDatasetModal = (formData) =>(dispatch, getState) => {
    const { datasets: { upload_dataset }} = getState();
    fetch(`${upload_dataset.uploadLink.href}`, {
        method: 'POST',
        body: formData,
    })
        .then(data => console.log(data))
};