/*
* Created by Brian
*/
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const routes = () => (
  <Router>
    <Switch>
      <Route exact path="/"/>
    </Switch>
  </Router>
);

export default routes;