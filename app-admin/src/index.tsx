import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose,
  Store,
} from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducers';
import { ActionTypes } from './actions/types';
import App from './App';
import * as serviceWorker from './serviceWorker';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store = createStore(
  reducer,
  compose(
    applyMiddleware(reduxThunk),
    composeEnhancers(),
  ),
);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.loginUser });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
