import React from "react";
import {  Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

//Mahasiswa
import FormPresensi from './pages/FormPresensi';
import FormPerizinan from './pages/FormPerizinan';
import FormResign from './pages/FormResign';
import RiwayatPresensi from './pages/RiwayatPresensi';
import RiwayatPerizinan from './pages/RiwayatPerizinan';

//Pengurus dan Manajemen
import DataIzinPergi from './pages/DataIzinPergi';
import FormApprovalIzinPergi from './pages/FormApprovalIzinPergi';

import DataIzinKembali from './pages/DataIzinKembali';

import DataResign from './pages/DataResign';

import ImportMahasiswa from './pages/ImportMahasiswa';
import DataMahasiswa from './pages/DataMahasiswa';
import DetailMahasiswa from './pages/DetailMahasiswa';
import EditMahasiswa from './pages/EditMahasiswa';
import TambahMahasiswa from './pages/TambahMahasiswa';

import Rekapitulasi from './pages/Rekapitulasi';


import ChangePassword from './pages/ChangePassword';

import NotFound from './pages/NotFound';

const Main = props =>(
    <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profile" component={Profile} />
        
        <PrivateRoute exact path="/form-presensi" component={FormPresensi} />
        <PrivateRoute exact path="/form-perizinan" component={FormPerizinan} />
        <PrivateRoute exact path="/form-resign" component={FormResign} />
        <PrivateRoute exact path="/riwayat-presensi" component={RiwayatPresensi} />
        <PrivateRoute exact path="/riwayat-perizinan" component={RiwayatPerizinan} />

        <PrivateRoute exact path="/data-izin-pergi" component={DataIzinPergi} />
        <PrivateRoute exact path="/form-approval-izin-pergi" component={FormApprovalIzinPergi} />

        <PrivateRoute exact path="/data-izin-kembali" component={DataIzinKembali} />

        <PrivateRoute exact path="/data-resign" component={DataResign} />

        <PrivateRoute exact path="/import-mahasiswa" component={ImportMahasiswa} />
        <PrivateRoute exact path="/data-mahasiswa" component={DataMahasiswa} />
        <PrivateRoute exact path="/detail-mahasiswa" component={DetailMahasiswa} />
        <PrivateRoute exact path="/edit-mahasiswa" component={EditMahasiswa} />
        <PrivateRoute exact path="/tambah-mahasiswa" component={TambahMahasiswa} />

        <PrivateRoute exact path="/rekapitulasi" component={Rekapitulasi} />
        
        <PrivateRoute exact path="/ganti-password" component={ChangePassword} />
        <Route path="*" component={NotFound} />
    </Switch>
)

export default Main;