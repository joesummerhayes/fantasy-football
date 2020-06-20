import React, { useEffect } from 'react';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import history from './history';
import AddPlayer from './views/components/add-player';
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
      <div>
        <PrivateRoute exact path="/add-player" component={AddPlayer} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
};

export default App;
