import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';
import { logoutAuth } from '../../../service/auth';

class Topbar extends Component {
    
    render() {
        const signOut = e => {
            e.preventDefault()
            logoutAuth();
        };
        
        const { clickMenuOpen } = this.props;

        return (
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          {/* <!-- Sidebar Toggle (Topbar) --> */}
          <button onClick={() => { clickMenuOpen() }}  id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>

          {/* <!-- Topbar Navbar --> */}
          <ul className="navbar-nav ml-auto">

            <div className="topbar-divider d-none d-sm-block"></div>

            {/* <!-- Nav Item - User Information --> */}
            <li className="nav-item dropdown no-arrow">
            <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Ichwan</span>
                <img className="img-profile rounded-circle" src="/images/profile/181511046.jpg"/>
              </Link>
              {/* <!-- Dropdown - User Information --> */}
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <Link className="dropdown-item" to="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={signOut} data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-fw mr-2 text-gray-400"></i>
                  Keluar
                </button>
              </div>
            </li>

          </ul>

        </nav>
         
        )
    }
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = store => ({
  toggled: store.menuState.menuOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);