import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarMahasiswa extends Component {
    render() {
        return (
            <div>
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
                            <Link className="collapse-item" to="/form-presensi">Presensi Asrama</Link>
                        </div>
                    </div>
                </li>

                {/* Riwayat Presensi */}
                <li className="nav-item">
                    <Link className="nav-link" to="/riwayat-presensi">
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
                            <Link className="collapse-item" to="/form-izin-pulang">Izin Pulang Asrama</Link>
                            <Link className="collapse-item" to="/form-resign">Resign Asrama</Link>
                        </div>
                    </div>
                </li>

                {/* Riwayat Perizinan */}
                <li className="nav-item">
                    <Link className="nav-link" to="/riwayat-perizinan">
                        <i class="fas fa-clipboard-list"></i>
                        <span>Riwayat perizinan</span>
                    </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />
            </div>
        );
    }
}

export default SidebarMahasiswa;