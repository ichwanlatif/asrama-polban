import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

class RiwayatPerizinan extends Component {
    constructor(){
        super();
        this.state = {
            role: ""
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
                            <PageHeading title="Riwayat Perizinan" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Riwayat Perizinan</h6>
                                    </div>
                                    <div className="card-body">

                                        {/* Tabel Perizinan */}
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Mulai</th>
                                                    <th scope="col">Berakhir</th>
                                                    <th scope="col">Jenis izin</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Konfirmasi kepulangan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>23 Mei 2021</td>
                                                        <td>26 Mei 2021</td>
                                                        <td>Pulang</td>
                                                        <td><span class="badge badge-pill badge-success">Diterima Komdis</span></td>
                                                        <td><Link to="#" className="btn btn-outline-primary btn-sm">Kembali</Link></td>
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

export default RiwayatPerizinan;