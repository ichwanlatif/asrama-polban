import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

class Rekapitulasi extends Component {
    constructor(){
        super();
        this.state = {
            role: '',
        };
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
    }

    render() {
        return (
            <div>
                <div id="wrapper">
                {/* <!-- Sidebar --> */}
                <Sidebar role= {this.state.role} />
                {/* <!-- End of Sidebar --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                        {/* <!-- Topbar --> */}
                        <Topbar />
                        {/* <!-- End of Topbar --> */}
                        <div className="container-fluid">
                            <PageHeading title="Rekapitulasi Presensi Kehadiran" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Rekapitulasi Presensi Kehadiran</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Nama</th>
                                                    <th scope="col">NIM</th>
                                                    <th scope="col">Kamar</th>
                                                    <th scope="col">Alfa</th>
                                                    <th scope="col">Izin</th>
                                                    <th scope="col">Hadir</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Tangal resign</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Ichwan Latif</td>
                                                        <td>181511046</td>
                                                        <td>1</td>
                                                        <td>3</td>
                                                        <td>2</td>
                                                        <td>60</td>
                                                        <td>Aktif</td>
                                                        <td>-</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* pagination */}
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination justify-content-end">
                                                <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                    <span class="sr-only">Previous</span>
                                                </a>
                                                </li>
                                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                                </li>
                                            </ul>
                                        </nav>
                                        
                                        {/* Unduh file */}
                                        <Link to="#" className="btn btn-light btn-icon-split">
                                            <span className="icon text-gray-600">
                                                <i className="fas fa-file-download"></i>
                                            </span>
                                            <span className="text">Unduh rekap</span>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Footer --> */}
                    <Footer/>
                    {/* <!-- End of Footer --> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Rekapitulasi;