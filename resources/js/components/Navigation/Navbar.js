import React from 'react'
import { Link } from 'react-router-dom'
 
const Navbar = () => (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <span class="navbar-toggler-icon"></span>
            </button>
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>
                {/* user menu */}
                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Ichwan Khun</span>
                        <img className="img-profile rounded-circle"
                            src="/images/profile/181511046.jpg"/>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <Link className="dropdown-item" to="/">
                            Profile
                        </Link>
                        <Link className="dropdown-item" to="/">
                            Notifikasi
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/" data-toggle="modal" data-target="#logoutModal">
                            Keluar
                        </Link>
                    </div>
                </li>
            </ul>
    </nav>
);
    
export default Navbar;