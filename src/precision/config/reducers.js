import { combineReducers } from 'redux';

import authReducer from '../modules/auth/login/reducer';
import caseReducer from '../modules/case/reducer';
import functionsReducer from '../modules/case/toolbar/reducer';

export default combineReducers({
  auth: authReducer,
  cases: caseReducer,
  functions: functionsReducer
})
