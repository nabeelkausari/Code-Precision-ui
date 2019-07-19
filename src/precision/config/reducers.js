import { combineReducers } from 'redux';

import authReducer from '../modules/auth/login/reducer';
import caseReducer from '../modules/case/reducer';
import functionsReducer from '../modules/case/toolbar/reducer';
import datasetReducer from '../modules/datasets/reducer';
import notesReducer from '../modules/steps/notes/reducers';
import consoleReducer from '../modules/console/reducer';
import userStepDetailsReducer from '../modules/steps/userStepDetails/reducer';


export default combineReducers({
  auth: authReducer,
  cases: caseReducer,
  functions: functionsReducer,
  datasets: datasetReducer,
  console: consoleReducer,
  notes: notesReducer,
  userStepDetails: userStepDetailsReducer
})
