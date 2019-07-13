import { combineReducers } from 'redux';

import authReducer from '../modules/auth/login/reducer';
import caseReducer from '../modules/case/reducer';
import functionsReducer from '../modules/case/toolbar/reducer';
import datasetReducer from '../modules/datasets/reducers';
import notesReducer from '../modules/steps/notes/reducers';

export default combineReducers({
  auth: authReducer,
  cases: caseReducer,
  functions: functionsReducer,
  datasets: datasetReducer,
  notes: notesReducer
})
