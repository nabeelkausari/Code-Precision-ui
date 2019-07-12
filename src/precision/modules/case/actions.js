import flatten from 'lodash/flatten'
import {fetchLinkAs} from "../../api/helpers";
import * as types from './types'


export const addDataSets = (payload) => ({ type: types.ADD_DATASETS, payload });

export const getCase = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_CASE_REQUESTED });

    const url = {
        "method": "GET",
        "href": "/users/3820/marketplace-courses/1180/solves/1530",
        "accept": "application/vnd.Analyttica.TreasureHunt.UserSolve+json"
    };
    fetchLinkAs(url)
        .then(({ data_sets, ...payload }) => {
            dispatch(addDataSets(data_sets));
            dispatch({ type: types.FETCH_CASE_SUCCEEDED, payload });
        })
        .catch(payload => dispatch({ type: types.FETCH_CASE_FAILED, payload }));
};

export const getSteps = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_STEPS_REQUESTED });
    const { cases: { info: { _links } } } = getState();
    fetchLinkAs(_links.user_steps)
        .then(payload => {
            const step_data_sets = flatten(payload.map(data => data.results.filter(ds => ds._links.data !== undefined)));
            dispatch(addDataSets(step_data_sets));

            const { cases: { data_sets } } = getState();
            data_sets.reduce((data, data_set, index) => {
                if (!data_set._links.modifies)
                    return data_sets;
                const href = data_set._links.modifies.href;
                const matching = data_sets
                    .map((ds, index) => ({ ds, index }))
                    .filter(({ ds }) => !!ds._links.self.href.match(href))
                    .shift();
                if (!matching) {
                    console.log('Cannot find the data set that was modified ', href);
                }
                data_sets[matching.index] = {...data_sets[index]};
                data_sets.splice(index,1);
                }, []);
            payload.sort((a, b) => (a.sequence_number) - (b.sequence_number));
            dispatch({ type: types.FETCH_STEPS_SUCCEEDED, payload });
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
}

export const setPrimaryFlyout = (payload) => (dispatch, getState) => {
    dispatch({type : types.SET_PRIMARY_FLYOUT, payload})
}

export const setSecondaryFlyout = (payload) => (dispatch, getState) => {

}













