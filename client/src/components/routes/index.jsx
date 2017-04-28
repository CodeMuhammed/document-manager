import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Home from './home.jsx';
import Dashboard from './dashboard.jsx';
import Signin from './auth.signin.jsx';
import Signup from './auth.signup.jsx';
import Documents from './documents.jsx';
import Document from './document.jsx';

const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Signin} />
    <Route path="/signin" component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="dashboard" component={Dashboard}>
      <IndexRoute component={Dashboard} />
      <Route path="documents" component={Documents} />
      <Route path="documents/:id" component={Document} />
    </Route>
  </Router>
);

export default App;
