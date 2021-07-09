import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';

//Role
import SidebarMahasiswa from './Mahasiswa';
import SidebarPengelola from './Pengelola';
import SidebarWadir from './Wadir';
 
class Sidebar extends Component {

    sidebarSwitch(role) {
        switch(role) {
            case "1":
                return <SidebarMahasiswa/>;
            case "2":
                return <SidebarPengelola/>;
            case "3":
                return <SidebarWadir/>;
        }
    }
      
    render() {
        const { clickMenuOpen, toggled } = this.props;
        return (
            <ul className={toggled ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled' : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'} id="accordionSidebar">

                {/* Role */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                    <img className="img-fluid img-thumbnail" src="/images/web/logo-web-polban.png" width="120"/>
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