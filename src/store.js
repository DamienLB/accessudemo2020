import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import throttle from './middleware/throttle.js';
import originChangeMonitor from './middleware/originChangeMonitor.js';





// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      originChangeMonitor,
      throttle,
    ),
  ),
);

export default store;
