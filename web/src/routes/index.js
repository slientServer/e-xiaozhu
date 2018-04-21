/*
* Created by Brian
*/
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Admin from '../container/Admin';
import Auth from '../container/Auth';
import Index from '../container/Index';

const routes = () => (
  <Router>
    <Switch>
      <Route exact path="/"/>
    </Switch>
  </Router>
);

export default routes;