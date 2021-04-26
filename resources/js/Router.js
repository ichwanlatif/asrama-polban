import React from "react";
import { Switch, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import { PrivateRoute } from './PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import FormPresensi from './components/Presensi/FormPresensi';

const Main = props =>(
    <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/formpresensi" component={FormPresensi} />
    </Switch>

)

export default Main;