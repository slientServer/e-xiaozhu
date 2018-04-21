/*
* Created by Brian
*/
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Admin from './container/Admin';
import Auth from './container/Auth';
import Register from './container/Register';
import Index from './container/Index';

const page = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/index" push />} />
      <Route path="/admin" component={ Admin } />
      <Route path="/login" component={ Auth } />
      <Route path="/auth" component={ Auth } />
      <Route path="/register" component={ Register } />
      <Route path="/index" component={ Index } />
    </Switch>
  </Router>
);

export default page;