import { fetchLinkAs} from "../../api/helpers";
import {getUserProfileLink} from "../../utils/storage";

import * as types from './types'

export const getprofile = () => (dispatch, getState) =>{
    let user_profile_link = getUserProfileLink();
    user_profile_link = {
        ...user_profile_link,
        type: "application/json"
    };
    console.log(user_profile_link)
    dispatch({type:types.FETCH_PROFILE_REQUESTED})
    fetchLinkAs(user_profile_link)
        .then(payload => dispatch({type:types.FETCH_PROFILE_SUCCEEDED, payload}))
        .catch(error => dispatch({type:types.FETCH_PROFILE_FAILED, payload:error}))
};