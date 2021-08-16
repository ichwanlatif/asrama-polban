import React from "react";
import {  Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { WadirRoute } from './WadirRoute';
import { PengelolaRoute } from './PengelolaRoute';
import { MahasiswaRoute } from './MahasiswaRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import NotFound from './pages/NotFound';

//Mahasiswa
import FormPresensi from './pages/FormPresensi';
import FormIzinPulang from './pages/FormIzinPulang';
import FormResign from './pages/FormResign';
import FormIzinKembali from "./pages/FormIzinKembali";
import RiwayatPresensi from './pages/RiwayatPresensi';
import RiwayatPerizinan from './pages/RiwayatPerizinan';

//Pengelola dan Wadir
import DataIzinPulang from './pages/DataIzinPulang';
import FormApprovalIzinPulang from './pages/FormApprovalIzinPulang';

import DataIzinKembali from './pages/DataIzinKembali';
import FormApprovalIzinKembali from "./pages/FormApprovalIzinKembali";

import DataResign from './pages/DataResign';
import FormApprovalResign from "./pages/FormApprovalResign";

import DataPresensi from './pages/DataPresensi';

import Rekapitulasi from './pages/Rekapitulasi';

//Wadir
import ImportMahasiswa from './pages/ImportMahasiswa';
import DataMahasiswa from './pages/DataMahasiswa';
import DetailMahasiswa from './pages/DetailMahasiswa';
import EditMahasiswa from './pages/EditMahasiswa';
import TambahMahasiswa from './pages/TambahMahasiswa';

const Main = props =>(
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <MahasiswaRoute exact path="/data-diri" component={Profile} />
        
        <MahasiswaRoute exact path="/form-presensi" component={FormPresensi} />
        <MahasiswaRoute exact path="/form-izin-pulang" component={FormIzinPulang} />
        <MahasiswaRoute exact path="/form-resign" component={FormResign} />
        <MahasiswaRoute exact path="/form-izin-kembali/:id" component={FormIzinKembali} />
        <MahasiswaRoute exact path="/riwayat-presensi" component={RiwayatPresensi} />
        <MahasiswaRoute exact path="/riwayat-perizinan" component={RiwayatPerizinan} />

        <PengelolaRoute exact path="/data-izin-pulang" component={DataIzinPulang} />
        <PengelolaRoute exact path="/form-approval-izin-pulang/:id" component={FormApprovalIzinPulang} />

        <PengelolaRoute exact path="/data-izin-kembali" component={DataIzinKembali} />
        <PengelolaRoute exact path="/form-approval-izin-kembali/:id" component={FormApprovalIzinKembali} />

        <PengelolaRoute exact path="/data-resign" component={DataResign} />
        <PengelolaRoute exact path="/form-approval-resign/:id" component={FormApprovalResign} />
        
        <PengelolaRoute exact path="/data-presensi" component={DataPresensi} />

        <PengelolaRoute exact path="/rekapitulasi" component={Rekapitulasi} />

        <WadirRoute exact path="/import-mahasiswa" component={ImportMahasiswa} />
        <WadirRoute exact path="/data-mahasiswa" component={DataMahasiswa} />
        <WadirRoute exact path="/detail-mahasiswa/:id" component={DetailMahasiswa} />
        <WadirRoute exact path="/edit-mahasiswa/:id" component={EditMahasiswa} />
        <WadirRoute exact path="/tambah-mahasiswa" component={TambahMahasiswa} />
        
        <Route path="*" component={NotFound} />
    </Switch>
)

export default Main;