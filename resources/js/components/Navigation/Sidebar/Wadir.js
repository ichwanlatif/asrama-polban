import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarWadir extends Component {
    render() {
        return (
            <div>
                {/* Perizinan */}
                <div className="sidebar-heading">
                    PERSETUJUAN IZIN
                </div>

                {/* Form Approval */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePresensi" aria-expanded="true" aria-controls="collapsePresensi">
                        <i class="fas fa-clipboard-check"></i>
                        <span>Form Approval</span>
                    </Link>
                    <div id="collapsePresensi" className="collapse" aria-labelledby="headingPresensi" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Jenis Perizinan:</h6>
                            <Link className="collapse-item" to="/data-izin-pulang">Izin Pulang Asrama</Link>
                            <Link className="collapse-item" to="/data-izin-kembali">Izin Kembali Asrama</Link>
                            <Link className="collapse-item" to="/data-resign">Resign Asrama</Link>
                        </div>
                    </div>
                </li>
                
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />
                
                {/* Rekapitulasi */}
                <div className="sidebar-heading">
                    KELOLA DATA
                </div>

                {/* Presensi Harian*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/data-presensi">
                        <i class="fas fa-clipboard-list"></i>
                        <span>Data Presensi Asrama</span>
                    </Link>
                </li>
                
                {/* Data Mahasiswa */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapseDataMahasiswa" aria-expanded="true" aria-controls="collapseDataMahasiswa">
                        <i class="fas fa-id-card"></i>
                        <span>Data Mahasiswa Asrama</span>
                    </Link>
                    <div id="collapseDataMahasiswa" className="collapse" aria-labelledby="headingDataMahasiswa" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Menu:</h6>
                            <Link className="collapse-item" to="/import-mahasiswa">Import Data</Link>
                            <Link className="collapse-item" to="/data-mahasiswa">Daftar Mahasiswa</Link>
                        </div>
                    </div>
                </li>

                {/* Rekap presensi dan perizinan */}
                <li className="nav-item">
                    <Link className="nav-link" to="/rekapitulasi">
                        <i class="fas fa-clipboard-list"></i>
                        <span>Rekap Data Mahasiswa</span>
                    </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />
            </div>
        );
    }
}

export default SidebarWadir;