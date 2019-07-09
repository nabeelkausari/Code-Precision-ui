import { combineReducers } from 'redux';

import authReducer from '../modules/auth/login/reducer';

export default combineReducers({
  auth: authReducer,
})
