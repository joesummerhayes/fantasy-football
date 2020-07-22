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
import { batchedSubscribe } from 'redux-batched-subscribe';
import { MuiThemeProvider } from '@material-ui/core/styles';
import reducer from './reducers';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ActionTypes } from './actions/types';
import { muiTheme } from './theme';

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
    batchedSubscribe((notify) => {
      notify();
    }),
  ),
);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.loginUser });
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
