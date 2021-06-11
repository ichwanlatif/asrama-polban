import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarPengurusKoordinator extends Component {
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
                            <Link className="collapse-item" to="/dataperizinan">Izin Pergi Asrama</Link>
                            <Link className="collapse-item" to="/dataresign">Resign Asrama</Link>
                        </div>
                    </div>
                </li>
                
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />
                
                {/* Rekapitulasi */}
                <div className="sidebar-heading">
                    Rekapitulasi
                </div>

                {/* Rekap Presensi */}
                <li className="nav-item">
                    <Link className="nav-link" to="/rekapitulasi">
                        <i class="fas fa-clipboard-list"></i>
                        <span>Rekap Data Mahasiswa</span>
                    </Link>
                </li>
                
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* Kelola data mahasiswa */}
                <div className="sidebar-heading">
                    KELOLA DATA MAHASISWA
                </div>

                {/* Data Mahasiswa */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapseDataMahasiswa" aria-expanded="true" aria-controls="collapseDataMahasiswa">
                        <i class="fas fa-id-card"></i>
                        <span>Data Mahasiswa</span>
                    </Link>
                    <div id="collapseDataMahasiswa" className="collapse" aria-labelledby="headingDataMahasiswa" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Menu:</h6>
                            <Link className="collapse-item" to="/importmahasiswa">Import Data</Link>
                            <Link className="collapse-item" to="/datamahasiswa">Daftar Mahasiswa</Link>
                        </div>
                    </div>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />
            </div>
        );
    }
}

export default SidebarPengurusKoordinator;