import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Signup from './views/Signup';
import Nav from './views/Nav';
import './App.css';

const App: React.FC = () => (
  <Router>
    <Nav />
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={Signup} />
    </div>
  </Router>
);

export default App;
