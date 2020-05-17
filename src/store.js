import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers';
import sagas from './sagas';
import throttle from './middleware/throttle.js';


// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();


const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      throttle,
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(sagas);

export default store;
