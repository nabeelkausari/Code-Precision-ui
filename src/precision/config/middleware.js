import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

// log actions in development mode
const loggerMiddleware = createLogger({
  collapsed: true,
  // only log in development mode
  predicate: () => process.env.NODE_ENV === "development"
});

// define store middlewares as an array
export default [
  thunkMiddleware,
  loggerMiddleware
];
