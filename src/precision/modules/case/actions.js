import {fetchLink, fetchLinkAs} from "../../api/helpers";
import * as types from './types'
import {getDatasets} from "../datasets/actions";


export const addDataSets = (payload) => ({ type: types.ADD_DATASETS, payload });

export const getCase = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_CASE_REQUESTED });

    const url = {
        "method": "GET",
        "href": "/users/3820/marketplace-courses/1373/solves/1712",
        "accept": "application/vnd.Analyttica.TreasureHunt.UserSolve+json"
    };
    fetchLinkAs(url)
        .then(({ data_sets, ...payload }) => {
            dispatch(getDatasets(payload));
            return dispatch({ type: types.FETCH_CASE_SUCCEEDED, payload });
        })
        .catch(payload => dispatch({ type: types.FETCH_CASE_FAILED, payload }));
};

export const getSteps = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_STEPS_REQUESTED });
    const { cases: { info } } = getState();
    fetchLinkAs(info._links.user_steps)
        .then(payload => {
            payload.sort((a, b) => (a.sequence_number) - (b.sequence_number));
            //payload = payload.slice(1);
            dispatch(getDatasets(info));
            return dispatch({ type: types.FETCH_STEPS_SUCCEEDED, payload });
        })
        .catch(payload => dispatch({ type: types.FETCH_STEPS_FAILED, payload }));
};

export const getResultsError = (payload) => (dispatch, getState) => {

    dispatch({ type: types.FETCH_RESULTS_ERR0R_REQUESTED });
    const headers = new Headers();
    fetch(payload, { method: 'GET', headers })
        .then(response => {
            console.log("RESPONSE",response)
        })
};

export const setCurrentStep = (payload) => (dispatch, getState) => {
    const {cases : {results : { is_primary_step_set, is_primary_flyout_open, results1 }} } = getState();
    if(is_primary_flyout_open && results1 && results1._links.self.href !== payload._links.self.href)
        {
            if(is_primary_step_set)
            {
                dispatch({type : types.SET_PREVIOUS_STEP});
                dispatch({type : types.OPEN_FLYOUT_SECONDARY})
            }
            dispatch({type : types.SET_CURRENT_STEP, payload});
            dispatch({type : types.OPEN_FLYOUT_PRIMARY})
        }
    else if(results1 === undefined || !is_primary_flyout_open){
        dispatch({type : types.SET_CURRENT_STEP, payload});
        dispatch({type : types.OPEN_FLYOUT_PRIMARY})
        }
    };



export const showPrimaryFlyout = () => (dispatch, getState) => {
    const {cases : {results : {is_primary_flyout_set}}} = getState()
    console.log("CURRENT REF : ", is_primary_flyout_set)
    if(is_primary_flyout_set || is_primary_flyout_set === undefined){
        dispatch(types.OPEN_FLYOUT_SECONDARY)
    }
    else{
        dispatch({type : types.OPEN_FLYOUT_PRIMARY})
    }
};

export const hideFlyout = (close_secondary) => (dispatch, getState) => {
    const {cases : {results : { is_secondary_flyout_open, results2 }} } = getState();
    console.log("CLOSE SECONDARY : ", close_secondary, results2)
    if(close_secondary){
        dispatch({type : types.CLOSE_FLYOUT_SECONDARY})
    }
    else if(is_secondary_flyout_open && !close_secondary){
        dispatch({type : types.SET_CURRENT_STEP, payload : results2})
        dispatch({type : types.CLOSE_FLYOUT_SECONDARY})
    }
    else{
        dispatch({type : types.CLOSE_FLYOUT_PRIMARY})
    }
};

export const resetResultsFlyouts = () => (dispatch, getState) => {
    dispatch({type : types.CLOSE_FLYOUT_PRIMARY})
    dispatch({type : types.CLOSE_FLYOUT_SECONDARY})
};

export const undo = (link) => (dispatch, getState) => {
    const { cases: { info } } = getState();
    dispatch({type : types.UNDO_REQUESTED});

    fetchLink(link)
        .then(() => fetchLinkAs(info._links.user_steps))
        .then(payload => {
            payload.sort((a, b) => (a.sequence_number) - (b.sequence_number));
            dispatch({type : types.UNDO_SUCCEEDED, payload})
        })
        .catch((payload) => dispatch({type : types.UNDO_FAILED, payload}))
};

export const redo = (link) => (dispatch, getState) =>
{
    const { cases: { info } } = getState();
    dispatch({type : types.REDO_REQUESTED})
    fetchLink(link)
        .then(() => fetchLinkAs(info._links.user_steps))
        .then(payload => {
            payload.sort((a, b) => (a.sequence_number) - (b.sequence_number));
            dispatch({type: types.REDO_SUCCEEDED, payload})
    }).catch((payload)=>{
    dispatch({type : types.REDO_FAILED, payload})
})
};

export const reset = () => (dispatch, getState) => {
    dispatch({type : types.RESET_REQUESTED});
    const { cases : {info: {_links: { reset }}}} = getState();
    fetchLink(reset)
        .then(() => {dispatch(getCase())})
        .then(() =>{
        dispatch(getSteps());
        dispatch({type: types.RESET_SUCCEEDED});
    })
        .catch((payload)=>{dispatch({type : types.REDO_FAILED, payload})
 })
};

export const rollback = (link) => (dispatch) => {
    dispatch({type : types.ROLLBACK_REQUESTED});
    fetchLink(link)
        .then(() => {
            dispatch(getSteps());
            dispatch({ type: types.ROLLBACK_SUCCEEDED });
        })
        .catch((payload)=> {dispatch({ type: types.ROLLBACK_FAILED, payload })})
};
















