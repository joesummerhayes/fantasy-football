import React, { useEffect } from 'react';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import history from './history';
import AddPlayer from './views/components/Player';
import PlayerSelect from './views/Players-search';
import Nav from './views/Nav';
import Login from './views/Login';
import { logoutAction } from './actions/index';
import PrivateRoute from './views/components/private-route';

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      dispatch(logoutAction());
    }
  });

  return (
    <Router history={history}>
      <Nav />
      <>
        <PrivateRoute exact path="/player" component={AddPlayer} />
        <PrivateRoute exact path="/players" component={PlayerSelect} />
        <Route exact path="/login" component={Login} />
      </>
    </Router>
  );
};

export default App;
