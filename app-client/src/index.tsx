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
import { Auth0Provider } from './contexts/auth0-context';
import reducer from './reducers';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENTION_COMPOSE__?: typeof compose;
  }
}

// Dev tools set up - not sure how to use alongside thunk
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  compose(
    applyMiddleware(reduxThunk),
  ),
);

ReactDOM.render(
  <Auth0Provider>
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
