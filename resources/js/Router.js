import React from "react";
import {  Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import FormPresensi from './pages/FormPresensi';
import NotFound from './pages/NotFound';

const Main = props =>(
    <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/formpresensi" component={FormPresensi} />
        <Route path="*" component={NotFound} />
    </Switch>
)

export default Main;