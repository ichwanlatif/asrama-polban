import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';

//Role
import SidebarMahasiswa from './Mahasiswa';
import SidebarPengurusKoordinator from './PengurusKoordinator';
import SidebarPengurusKomdis from './PengurusKomdis';
import SidebarManajemen from './Manajemen';
 
class Sidebar extends Component {

    sidebarSwitch(role) {
        switch(role) {
            case "1":
                return <SidebarMahasiswa/>;
            case "2":
                return <SidebarPengurusKoordinator/>;
            case "3":
                return <SidebarPengurusKomdis/>;
            case "4":
                return <SidebarManajemen/>;
        }
    }
      
    render() {
        const { clickMenuOpen, toggled } = this.props;
        return (
            <ul className={toggled ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled' : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'} id="accordionSidebar">

                {/* Role */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                    <i className="fas fa-users"></i>
                    <div className="sidebar-brand-text mx-3">Asrama</div>
                </Link>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* Dashboard */}
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        <i className="fas fa-home"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* Dynamic role item */}
                {this.sidebarSwitch(this.props.role)}

                {/* Kelola Akun */}
                <div className="sidebar-heading">
                    KELOLA AKUN
                </div>

                {/* Password */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePassword" aria-expanded="true" aria-controls="collapsePassword">
                        <i className="fas fa-key"></i>
                        <span>Password</span>
                    </Link>
                    <div id="collapsePassword" className="collapse" aria-labelledby="headingPresensi" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Atur Password:</h6>
                            <Link className="collapse-item" to="/gantipassword">Ganti Password</Link>
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