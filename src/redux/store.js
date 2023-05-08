import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middleware = [reduxThunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.REACT_APP_NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
