/*
* Created by Brian
*/
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/admin/home';
import Users from '../components/admin/users';

const routes = () => (
  <div>
    <Route path="/admin" exact component={Home}/>
    <Route path="/admin/home" exact component={Home}/>
    <Route path="/admin/users" exact component={Users}/>
  </div>
);

export default routes;