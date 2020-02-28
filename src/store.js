import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { appDispatcher } from './middleware/dispatcher';


// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      appDispatcher,
    ),
  ),
);

export default store;
