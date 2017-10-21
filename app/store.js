import { createStore, applyMiddleware } from 'redux';

import reducer from 'reducer';


export default function setupStore(initialState) {
  return createStore(
    reducer,
    initialState,
    (window.devToolsExtension && process.env.NODE_ENV === 'development') ?
      window.devToolsExtension() : f => f
  );
}
