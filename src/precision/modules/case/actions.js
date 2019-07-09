import {fetchLinkAs} from "../../api/helpers";
import * as types from './types'

export const getCase = () => (dispatch) => {
  const url = {
    "method": "GET",
    "href": "/users/3820/marketplace-courses/1180/solves/1530",
    "accept": "application/vnd.Analyttica.TreasureHunt.UserSolve+json"
  };

  dispatch({ type: types.FETCH_CASE_REQUESTED })
  dispatch({ type: types.FETCH_STEPS_REQUESTED })

  fetchLinkAs(url)
    .then(payload => {
      dispatch({ type: types.FETCH_CASE_SUCCEEDED, payload })
      return fetchLinkAs(payload._links.user_steps)
    })
    .then(payload => dispatch({ type: types.FETCH_STEPS_SUCCEEDED, payload }))
    .catch(payload => dispatch({ type: types.FETCH_CASE_FAILED, payload }))
}

