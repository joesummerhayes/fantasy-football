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
import reducers from './reducers';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
  reducers,
  {},
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
