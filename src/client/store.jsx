import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import rootReducer from './rootReducer';


let middleware;

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(promise());
} else {
  middleware = applyMiddleware(promise(), logger());
}

const store = createStore(rootReducer, middleware);

export default store;
