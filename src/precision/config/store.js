import {applyMiddleware, createStore, compose} from 'redux';
import middleware from './middleware';
import rootReducer from './reducers';

/* Enable redux dev tools only in development.
 * We suggest using the standalone React Native Debugger extension:
 * https://github.com/jhen0409/react-native-debugger
 */
/* eslint-disable no-undef */
const composeEnhancers = (
  process.env.NODE_ENV === "development" &&
  typeof (window) !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(applyMiddleware(...middleware));

// create the store
const store = createStore(
  rootReducer,
    {},
  enhancer
);



export default store;

