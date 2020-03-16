import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './views/Landing';
import './App.css';

const App: React.FC = () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
    </div>
  </Router>
);

export default App;
