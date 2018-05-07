/*
* Created by Brian
*/
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/admin/home';
import Users from '../components/admin/users';
import Projects from '../components/admin/projects';

const routes = () => (
  <div>
    <Route path="/admin" exact component={Home}/>
    <Route path="/admin/home" exact component={Home}/>
    <Route path="/admin/users" exact component={Users}/>
    <Route path="/admin/projects" exact component={Projects}/>
  </div>
);

export default routes;