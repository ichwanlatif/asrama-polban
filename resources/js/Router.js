import React from "react";
import {  Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import FormPresensi from './pages/FormPresensi';
import FormPerizinan from './pages/FormPerizinan';
import FormResign from './pages/FormResign';
import FormApprovalPerizinan from './pages/FormApprovalPerizinan';
import RiwayatPresensi from './pages/RiwayatPresensi';
import RiwayatPerizinan from './pages/RiwayatPerizinan';
import UpdatePassword from './pages/UpdatePassword';
import NotFound from './pages/NotFound';

const Main = props =>(
    <Switch>
        <Route exact path="/" component={SignIn} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/formpresensi" component={FormPresensi} />
        <PrivateRoute exact path="/formperizinan" component={FormPerizinan} />
        <PrivateRoute exact path="/formresign" component={FormResign} />
        <PrivateRoute exact path="/formapprovalperizinan" component={FormApprovalPerizinan} />
        <PrivateRoute exact path="/riwayatpresensi" component={RiwayatPresensi} />
        <PrivateRoute exact path="/riwayatperizinan" component={RiwayatPerizinan} />
        <PrivateRoute exact path="/gantipassword" component={UpdatePassword} />
        <Route path="*" component={NotFound} />
    </Switch>
)

export default Main;