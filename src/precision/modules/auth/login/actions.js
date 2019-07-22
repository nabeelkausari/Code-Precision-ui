import {tokens} from "../../../api/tokens"
import * as types from "./types";
import {setUserId, setUserProfileLink} from "../../../utils/storage";
import {history} from "../../../routes";


export const login = ({ email, password }) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUESTED })
  return tokens
    .create(email, password)
    .then(payload => {
      setUserProfileLink(payload._links.user_profile);
      setUserId(payload.user_id);
      dispatch({ type: types.LOGIN_SUCCEEDED, payload })
    })
    .catch(payload => dispatch({ type: types.LOGIN_FAILED, payload }))
};


export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch(history.push('/auth/login'));
}
