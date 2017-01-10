import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Home from './home.jsx';
import Signin from './auth.signin.jsx';
import Signup from './auth.signup.jsx';

const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/signin" component={Signin} />
    <Route path="/signup" component={Signup} />
  </Router>
);

export default App;
