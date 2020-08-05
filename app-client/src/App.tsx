import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import CreateTeam from './views/create-team/Create-Team';
import Signup from './views/Signup';
import Login from './views/Login';
import Nav from './views/Nav';
import { logoutAction, getUserAction } from './actions/index';
import './App.css';
import history from './history';
import PrivateRoute from './views/components/private-route';
import MyTeam from './views/my-team';
import PlayerSearch from './views/player-search';
import Header from './views/components/Header';
import PlayerAuction from './views/player-auction';
import Leagues from './views/leagues';
import CreateLeague from './views/leagues/create-league';
import JoinLeague from './views/leagues/join-league';
import { AppState } from './app-state';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const signedIn = useSelector((state: any) => state.user.loggedIn);
  const token = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiryDate');

  useEffect(() => {
    if (!token || !expiryDate) {
      return;
    }
    dispatch(getUserAction());
    if (new Date(expiryDate) <= new Date()) {
      dispatch(logoutAction());
    }
  }, [token]);

  return (
    <Router history={history}>
      {signedIn && <Header />}
      <div style={{ paddingRight: '3rem', paddingLeft: '3rem' }}>
        {signedIn && <Nav />}
        <PrivateRoute path="/create-team" component={CreateTeam} />
        <PrivateRoute path="/my-team" component={MyTeam} />
        <PrivateRoute path="/leagues" component={Leagues} />
        <PrivateRoute path="/create-league" component={CreateLeague} />
        <PrivateRoute path="/join-league" component={JoinLeague} />
        <PrivateRoute path="/players" component={PlayerSearch} />
        <PrivateRoute path="/auction-room" component={PlayerAuction} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </div>
    </Router>
  );
};

export default App;
