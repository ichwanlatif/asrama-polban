import React from "react";
import {  Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

//Mahasiswa
import FormPresensi from './pages/FormPresensi';
import FormIzinPulang from './pages/FormIzinPulang';
import FormResign from './pages/FormResign';
import FormIzinKembali from "./pages/FormIzinKembali";
import RiwayatPresensi from './pages/RiwayatPresensi';
import RiwayatPerizinan from './pages/RiwayatPerizinan';

//Pengurus dan Manajemen
import DataIzinPulang from './pages/DataIzinPulang';
import FormApprovalIzinPulang from './pages/FormApprovalIzinPulang';

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
import FormApprovalIzinKembali from "./pages/FormApprovalIzinKembali";

const Main = props =>(
    <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profile" component={Profile} />
        
        <PrivateRoute exact path="/form-presensi" component={FormPresensi} />
        <PrivateRoute exact path="/form-izin-pulang" component={FormIzinPulang} />
        <PrivateRoute exact path="/form-resign" component={FormResign} />
        <PrivateRoute exact path="/form-izin-kembali/:id" component={FormIzinKembali} />
        <PrivateRoute exact path="/riwayat-presensi" component={RiwayatPresensi} />
        <PrivateRoute exact path="/riwayat-perizinan" component={RiwayatPerizinan} />

        <PrivateRoute exact path="/data-izin-pulang" component={DataIzinPulang} />
        <PrivateRoute exact path="/form-approval-izin-pulang/:id" component={FormApprovalIzinPulang} />

        <PrivateRoute exact path="/data-izin-kembali" component={DataIzinKembali} />
        <PrivateRoute exact path="/form-approval-izin-kembali/:id" component={FormApprovalIzinKembali} />

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