import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Signup from './views/Signup';
import Login from './views/Login';
import Nav from './views/Nav';
import { logoutAction } from './actions/index';
import './App.css';
import history from './history';
import PrivateRoute from './views/components/private-route';

const App: React.FC = () => {
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
        <PrivateRoute path="/protectedRoute" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </div>
    </Router>
  )
};

export default App;
