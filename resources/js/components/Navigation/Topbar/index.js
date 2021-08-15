import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';
import { logoutAuth } from '../../../service/auth';

class Topbar extends Component {
      constructor(){
        super();
        this.state = {
            nama_mhs: ""
        };
    }

    componentDidMount(){
      let nama_mhs;
      
      if(localStorage.getItem("nama_mhs")){
        nama_mhs = localStorage.getItem("nama_mhs")
      }else{
        switch(localStorage.getItem("user_role")) {
          case "2":
            nama_mhs ="Pengelola Asrama";
            break;
          case "3":
            nama_mhs ="Wakil Direktur 3";
            break;
        }
      }
      this.setState({
        nama_mhs
      });
    }
    
    render() {
        const signOut = e => {
            e.preventDefault()
            logoutAuth();
        };

        const nama_mhs = this.state.nama_mhs;
        const { clickMenuOpen } = this.props;

        let photo_profile;
        let data_diri;
        if(localStorage.getItem("user_role")==="1"){
          photo_profile = <img className="img-profile rounded-circle" src={"https://akademik.polban.ac.id/fotomhsrekap/"+localStorage.getItem("nim")+".jpg"} />
          data_diri = <Link className="dropdown-item" to="/data-diri">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Data diri
                      </Link>
        }else{
          photo_profile = <img className="img-profile rounded-circle" src="/images/profile/polban.jpg" />
          data_diri=<div></div>
        }

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
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{nama_mhs}</span>
                {photo_profile}
              </Link>
              {/* <!-- Dropdown - User Information --> */}
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                {data_diri}
                <button className="dropdown-item" onClick={signOut} data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-fw mr-2 text-gray-400"></i>
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