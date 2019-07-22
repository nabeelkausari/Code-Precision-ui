import { history } from "../../routes";
import {fetchLink, fetchLinkAs, fetchLinkDirectly, fetchLinkDirectlyAs} from "../../api/helpers";
import * as types from './types'
import {getDatasets} from "../datasets/actions";
import {getUserId} from "../../utils/storage";

const getCaseDetailLink = (id) =>{
    const user_id = getUserId();
    return {
        "method": "GET",
        "href": `/user/${user_id}/case/${id}`,
        "accept": "application/json"
    }
}

export const getCaseDetails = (case_detail_link) => (dispatch, getState) => {
    fetchLinkAs(case_detail_link)
        .then(case_detail_response => {
            dispatch({type:types.SAVE_CASE_DETAILS, payload:case_detail_response});
            const get_scenario_details_link = case_detail_response.scenarios[0]._links.get_scenario_details;
            fetchLinkAs(get_scenario_details_link)
                .then(scenario_details_response => {
                    dispatch({type:types.SAVE_SCENARIO_DETAILS, payload:scenario_details_response});
                    dispatch(history.push(`/cases/${case_detail_response.id}/${case_detail_response.scenarios[0].id}/dashboard`))
                })
        })
}
export const getCaseAndScenario = (case_id, scenario_id) => (dispatch, getState) => {
    fetchLinkAs(getCaseDetailLink(case_id))
        .then(case_detail_response => {
            dispatch({type:types.SAVE_CASE_DETAILS, payload:case_detail_response});
            const scenario_detail = case_detail_response.scenarios.filter(item => String(scenario_id) === String(item.id)).shift();
            if (!scenario_detail) {
                dispatch(history.push(`/cases`))
            }
            return fetchLinkAs(scenario_detail._links.get_scenario_details)
        })
        .then(scenario_details_response => {
            return fetchLinkAs(scenario_details_response._links.resume);
            // dispatch({type:types.SAVE_SCENARIO_DETAILS, payload:scenario_details_response});
        })
        .then(({ data_sets, ...payload }) => {
            dispatch(getDatasets(payload));
            return dispatch({ type: types.FETCH_CASE_SUCCEEDED, payload });
        })
}


export const addDataSets = (payload) => ({ type: types.ADD_DATASETS, payload });

export const getCase = () => (dispatch, getState) => {
    const {cases:{current_case:{current_scenario}}} = getState();
    if(current_scenario._links === undefined) return;
    dispatch({ type: types.FETCH_CASE_REQUESTED });
    fetchLinkAs(current_scenario._links.resume)
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

export const getCases = () => (dispatch, getState) =>{
    const {profile:{info:{_links}}} = getState();
    const get_cases_link = {
        ..._links.get_user_cases,
        type: 'application/json'
    }
    dispatch({type:types.FETCH_CASES_REQUESTED});
    return  fetchLinkAs(get_cases_link)
        .then(payload => dispatch({type:types.FETCH_CASES_SUCCEEDED, payload}))
        .catch(error => dispatch({type:types.FETCH_CASES_FAILED, error}))
};
export const getAllCases = () => (dispatch, getState) =>{
    const {profile:{info:{_links}}} = getState();
    const get_all_cases_link = {
        ..._links.get_all_cases,
        type: 'application/json'
    }
    dispatch({type:types.FETCH_ALL_CASES_REQUESTED});
    return fetchLinkAs(get_all_cases_link)
        .then(payload => dispatch({type:types.FETCH_ALL_CASES_SUCCEEDED, payload}))
        .catch(error => dispatch({type:types.FETCH_ALL_CASES_FAILED, error}))
};

export const getCaseCategories = () => (dispatch, getState) =>{
    const end_point ={
        href: '/case/categories',
        method: 'GET',
        type: 'application/json'
    };
    dispatch({type:types.FETCH_CASE_CATEGORIES_REQUESTED});
    return fetchLinkAs(end_point)
        .then(payload => dispatch({type:types.FETCH_CASE_CATEGORIES_SUCCEEDED, payload}))
        .catch(error => dispatch({type:types.FETCH_CASE_CATEGORIES_FAILED, error}))
};

export const createBusinessProblem = (params) => (dispatch, getState) => {
    const {profile:{info:{_links : { create_problem}}}} = getState();

    dispatch({type:types.CREATE_PROBLEM_REQUESTED});
    return fetchLinkAs(create_problem, params)
        .then(payload => dispatch({type:types.CREATE_PROBLEM_SUCCEEDED, payload}))
        .catch(error => dispatch({type:types.CREATE_PROBLEM_FAILED, error}))
};

export const getRecommendations = () => (dispatch, getState) => {
    const {cases:{create:{problem:{_links:{case_recommendations}}}}} = getState();

    dispatch({type:types.GET_CASE_RECOMMENDATIONS_REQUESTED});
    return fetchLinkAs(case_recommendations)
        .then(payload => dispatch({type:types.GET_CASE_RECOMMENDATIONS_SUCCEEDED, payload}))
        .catch(error => dispatch({type:types.GET_CASE_RECOMMENDATIONS_FAILED, error}))
};

export const createCase = (payload) => (dispatch, getState) => {
    const {cases:{create:{problem:{_links:{create_case}}}}} = getState();
    let params = {
        ...payload,
        referenceCaseIds:[]
    }
    dispatch({type:types.CREATE_CASE_REQUESTED});
    return fetchLinkAs(create_case,params)
        .then(payload => {
            dispatch({type:types.CREATE_CASE_SUCCEEDED, payload});
            getCaseDetails(payload._links.get_case_details);
        })
        .catch(error => dispatch({type:types.CREATE_CASE_FAILED, error}))
};



export const selectRecommendation = (ids) => (dispatch, getState) => {
    dispatch({type:types.SELECT_RECOMMENDATIONS, payload:ids})
};













