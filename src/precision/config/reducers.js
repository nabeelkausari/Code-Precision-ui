import { combineReducers } from 'redux';

import authReducer from '../modules/auth/login/reducer';
import caseReducer from '../modules/case/reducer';

export default combineReducers({
  auth: authReducer,
  case: caseReducer
})
