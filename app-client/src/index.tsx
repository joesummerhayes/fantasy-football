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
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  compose(
    applyMiddleware(reduxThunk),
    composeEnhancers(),
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
