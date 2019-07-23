import * as types from './types'
import {fetchLink, fetchLinkAs} from "../../api/helpers";
import Papa from "papaparse";


export const selectTable = (payload) => ({ type: types.SELECT_TABLE, payload });

export const getDatasets = (scenario) => (dispatch) => {
    dispatch({ type: types.FETCH_DATASET_REQUESTED });
     fetchLinkAs(scenario._links.tables_with_columns)
        .then(payload => {
            dispatch({ type: types.FETCH_DATASET_SUCCEEDED, payload })
        })
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
    dispatch({ type: types.DATASET_CREATED_REQUESTED});
    const { datasets: { upload_dataset }} = getState();
    fetch(`${upload_dataset.uploadLink.href}`, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .then(data => dispatch(handleSubmitModal(data)))
};

const handleSubmitModal = (data) => (dispatch, getState) => {
    dispatch({ type: types.DATASET_CREATED_REQUESTED });
    const {cases : {info: {_links}}} = getState();
        const payload = {
            path: JSON.stringify([data.filename]),
        };
        fetchLink(_links.add_data_sets, payload)
            .then(() => {
                dispatch({ type: types.DATASET_CREATED_SUCCEEDED });
                dispatch(selectTable(data.filename))
            })
            .catch(payload => dispatch({ type: types.DATASET_CREATED_FAILED, payload }));
};

export const fetchSqlForm = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_SQL_FORM_REQUESTED });
    const {functions : { list: { by_uri }}} = getState();
    const sql_form = by_uri['/functions/FUNC0473'];
    if(sql_form === undefined) return;
    const payload = {};
    fetchLinkAs(sql_form._links.parameters , payload)
        .then(payload => dispatch({ type: types.FETCH_SQL_FORM_SUCCEEDED, payload }))
        .catch(payload => dispatch({ type: types.FETCH_SQL_FORM_FAILED, payload}))
};


export const connectToExternalDatabase = (payload) => (dispatch, getState) => {
    const {cases} = getState();
    const param = {
        selections: {},
        all_headers: {},
        parameters: payload,
        function_id: "FUNC0473"
    };
    return fetchLinkAs(cases.info._links.create_user_step, param)
        .then(payload => console.log(payload))
        .catch(payload => console.log(payload))
};

export const fetchPreloadDatasets = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_PRELOAD_DATASET_REQUESTED });
    const link = {
        href: "/projects/datasets/preloaded",
        method:"GET",
        type: "application/json"
    };

    fetchLink(link)
        .then(res => res.json())
        .then(payload => dispatch({ type: types.FETCH_PRELOAD_DATASET_SUCCEEDED, payload}))
        .catch(payload => dispatch({ type: types.FETCH_PRELOAD_DATASET_FAILED, payload}))
};


export const handleSubmitPreloadModal = (data) => (dispatch, getState) => {
    dispatch({ type: types.DATASET_CREATED_REQUESTED });
    const {cases : {info: {_links}}} = getState();
    const payload = {
        path: JSON.stringify([data]),
    };
    fetchLink(_links.add_data_sets, payload)
        .then(() => dispatch({ type: types.DATASET_CREATED_SUCCEEDED }))
        .catch(payload => dispatch({ type: types.DATASET_CREATED_FAILED, payload }));
};