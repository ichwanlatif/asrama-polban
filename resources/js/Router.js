import React from "react";
import {  Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

//Mahasiswa
import FormPresensi from './pages/FormPresensi';
import FormPerizinan from './pages/FormPerizinan';
import FormResign from './pages/FormResign';
import RiwayatPresensi from './pages/RiwayatPresensi';
import RiwayatPerizinan from './pages/RiwayatPerizinan';

//Pengurus dan Manajemen
import DataPerizinan from './pages/DataPerizinan';
import FormApprovalPerizinan from './pages/FormApprovalPerizinan';
import DataResign from './pages/DataResign';
import FormApprovalResign from './pages/FormApprovalResign';
import ImportMahasiswa from './pages/ImportMahasiswa';
import DataMahasiswa from './pages/DataMahasiswa';

import ChangePassword from './pages/ChangePassword';

import NotFound from './pages/NotFound';

const Main = props =>(
    <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        
        <PrivateRoute exact path="/formpresensi" component={FormPresensi} />
        <PrivateRoute exact path="/formperizinan" component={FormPerizinan} />
        <PrivateRoute exact path="/formresign" component={FormResign} />
        <PrivateRoute exact path="/riwayatpresensi" component={RiwayatPresensi} />
        <PrivateRoute exact path="/riwayatperizinan" component={RiwayatPerizinan} />

        <PrivateRoute exact path="/dataperizinan" component={DataPerizinan} />
        <PrivateRoute exact path="/formapprovalperizinan/:id" component={FormApprovalPerizinan} />
        <PrivateRoute exact path="/dataresign" component={DataResign} />
        <PrivateRoute exact path="/formapprovalresign" component={FormApprovalResign} />
        <PrivateRoute exact path="/importmahasiswa" component={ImportMahasiswa} />
        <PrivateRoute exact path="/datamahasiswa" component={DataMahasiswa} />
        
        <PrivateRoute exact path="/gantipassword" component={ChangePassword} />
        <Route path="*" component={NotFound} />
    </Switch>
)

export default Main;