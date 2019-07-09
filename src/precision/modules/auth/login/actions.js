import {tokens} from "../../../api/tokens"
import * as types from "./types"

export const login = ({ email, password }) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUESTED })
  return tokens
    .create(email, password)
    .then(payload => dispatch({ type: types.LOGIN_SUCCEEDED, payload }))
    .catch(payload => dispatch({ type: types.LOGIN_FAILED, payload }))
}
