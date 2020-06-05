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
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { LOGIN_USER } from './actions/types';

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
  store.dispatch({ type: LOGIN_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
