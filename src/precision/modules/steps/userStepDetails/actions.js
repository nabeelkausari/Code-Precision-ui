import {fetchLinkAs} from "../../../api/helpers";
import * as types from './types';

export const fetchShowCodeTabs = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_USER_STEP_DETAILS_REQUESTED });
    const { cases: {info} } = getState();
    fetchLinkAs(info._links.show_code_tabs)
        .then(payload => {
            dispatch({ type: types.FETCH_USER_STEP_DETAILS_SUCCEEDED, payload})
            dispatch(fetchShowCodeSteps())
        })
        .catch(payload => dispatch({ type: types.FETCH_USER_STEP_DETAILS_FAILED, payload}));
};

export const fetchShowCodeSteps = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_USER_CODE_REQUESTED });
    const { userStepDetails: { user_step_details_info, current_tab_reference } } = getState();
    const tab = user_step_details_info.filter(tab => tab._links.self.href === current_tab_reference).shift();
    if (current_tab_reference === '' || tab === undefined) return;
    fetchLinkAs({href: tab._links.steps.href, method: tab._links.steps.method, type: "application/json" })
        .then((steps) => dispatch({type: types.FETCH_USER_CODE_SUCCEEDED, payload: {steps: steps, current_tab_reference: current_tab_reference}})
        .catch(payload => dispatch({ type: types.FETCH_USER_CODE_FAILED, payload})))
};

export const setCurrentShowCodeTab = (current_tab_reference) => (dispatch, getState) => {
    dispatch(setCurrentShowCodeTabInternal(current_tab_reference));
    dispatch(fetchShowCodeSteps());
};

export const setCurrentShowCodeTabInternal = (payload) => ({
    type: types.SET_CURRENT_SHOW_CODE_TAB,
    payload
});


export const fetchShowCodeStepsSuccess = (current_tab_reference, steps) => ({
    type: types.FETCH_USER_CODE_SUCCEEDED,
    payload : {
        steps: steps,
        current_tab_reference: current_tab_reference,
    }
});