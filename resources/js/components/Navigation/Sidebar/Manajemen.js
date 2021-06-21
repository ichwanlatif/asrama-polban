import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarManajemen extends Component {
    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default SidebarManajemen;