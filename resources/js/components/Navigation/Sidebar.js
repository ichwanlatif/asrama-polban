import React from 'react'
import { Link } from 'react-router-dom'
 
const Sidebar = () => (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        {/* Role */}
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
            <div className="sidebar-brand-text mx-3">MAHASISWA</div>
        </Link>
        <hr className="sidebar-divider"></hr>

        {/* Presensi */}
        <div className="sidebar-heading">
            PRESENSI
        </div>
        <li className="nav-item">
            <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePresensi"
                aria-expanded="true" aria-controls="collapsePresensi">
                <span>Form Presensi</span>
            </Link>
            <div id="collapsePresensi" class="collapse" aria-labelledby="headingPresensi" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Jenis Presensi:</h6>
                    <Link className="collapse-item" to="/dashboard">Presensi Asrama</Link>
                    <Link className="collapse-item" to="/dashboard">Presensi Kajian</Link>
                </div>
            </div>
        </li>
        <li className="nav-item">
                <Link class="nav-link" to="/dashboard">
                <span>Riwayat Presensi</span></Link>
        </li>
        <hr className="sidebar-divider"></hr>

        {/* Perizinan */}
        <div className="sidebar-heading">
                PERIZINAN
        </div>
        <li className="nav-item">
            <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePerizinan"
                aria-expanded="true" aria-controls="collapsePerizinan">
                <span>Buat Perizinan</span>
            </Link>
            <div id="collapsePerizinan" class="collapse" aria-labelledby="headingPerizinan" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Jenis Perizinan:</h6>
                    <Link className="collapse-item" to="/dashboard">Izin Pergi</Link>
                    <Link className="collapse-item" to="/dashboard">Izin Keluar</Link>
                </div>
            </div>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
                <span>Riwayat perizinan</span></Link>
        </li>
        <hr class="sidebar-divider d-none d-md-block"></hr>

        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
    </ul>
);
    
export default Sidebar;