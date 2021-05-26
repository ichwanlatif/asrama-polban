import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarManajemen extends Component {
    render() {
        return (
            <div>
                {/* Presensi */}
                <div className="sidebar-heading">
                    PRESENSI
                </div>

                {/* Rekap Presensi */}
                <li className="nav-item">
                    <Link className="nav-link" to="#">
                        <i class="fas fa-clipboard-list"></i>
                        <span>Rekap Presensi</span>
                    </Link>
                </li>
                
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* Perizinan */}
                <div className="sidebar-heading">
                    PERIZINAN
                </div>

                {/* Rekap Perizinan */}
                <li className="nav-item">
                    <Link className="nav-link" to="#">
                        <i class="fas fa-clipboard-list"></i>
                        <span>Rekap perizinan</span>
                    </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />
            </div>
        );
    }
}

export default SidebarManajemen;