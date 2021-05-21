import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';
 
class Sidebar extends Component {
    render() {
        const { clickMenuOpen, toggled } = this.props;
        return (
            <ul className={toggled ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled' : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'} id="accordionSidebar">

                {/* Role */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                    <i class="fas fa-users"></i>
                    <div className="sidebar-brand-text mx-3">MAHASISWA</div>
                </Link>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* Dashboard */}
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        <i class="fas fa-home"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* Presensi */}
                <div className="sidebar-heading">
                    PRESENSI
                </div>

                {/* Form Presensi */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePresensi" aria-expanded="true" aria-controls="collapsePresensi">
                        <i class="fas fa-calendar-check"></i>
                        <span>Form Presensi</span>
                    </Link>
                    <div id="collapsePresensi" className="collapse" aria-labelledby="headingPresensi" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Jenis Presensi:</h6>
                            <Link className="collapse-item" to="/formpresensi">Presensi Asrama</Link>
                        </div>
                    </div>
                </li>

                {/* Riwayat Presensi */}
                <li className="nav-item">
                    <Link className="nav-link" to="#">
                        <i class="fas fa-clipboard-list"></i>
                        <span>Riwayat Presensi</span>
                    </Link>
                </li>
                
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* Perizinan */}
                <div className="sidebar-heading">
                        PERIZINAN
                </div>

                {/* Forn Perizinan */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePerizinan" aria-expanded="true" aria-controls="collapsePerizinan">
                        <i class="fas fa-portrait"></i>
                        <span>Buat Perizinan</span>
                    </Link>
                    <div id="collapsePerizinan" className="collapse" aria-labelledby="headingPerizinan" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Jenis Perizinan:</h6>
                            <Link className="collapse-item" to="#">Izin Pergi</Link>
                            <Link className="collapse-item" to="#">Izin Keluar</Link>
                        </div>
                    </div>
                </li>

                {/* Riwayat Perizinan */}
                <li className="nav-item">
                    <Link className="nav-link" to="#">
                        <i class="fas fa-clipboard-list"></i>
                        <span>Riwayat perizinan</span>
                    </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* Kelola Akun */}
                <div className="sidebar-heading">
                    KELOLA AKUN
                </div>

                {/* Password */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePassword" aria-expanded="true" aria-controls="collapsePassword">
                        <i class="fas fa-key"></i>
                        <span>Password</span>
                    </Link>
                    <div id="collapsePassword" className="collapse" aria-labelledby="headingPresensi" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Atur Password:</h6>
                            <Link className="collapse-item" to="#">Ganti Password</Link>
                        </div>
                    </div>
                </li>
                
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <div className="text-center d-none d-md-inline">
                    <button onClick={() => { clickMenuOpen() }} className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        )
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = store => ({
  toggled: store.menuState.menuOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);