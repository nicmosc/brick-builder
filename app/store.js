import { createStore, applyMiddleware } from 'redux';

import reducer from 'reducer';


export default function setupStore(initialState) {
  return createStore(
    reducer,
    initialState,
    (window.window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development') ?
      window.window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  );
}
