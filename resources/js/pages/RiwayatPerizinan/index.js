import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

class RiwayatPerizinan extends Component {
    constructor(){
        super();
        this.state = {
            role: "1"
        };
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
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Mulai</th>
                                                    <th scope="col">Berakhir</th>
                                                    <th scope="col">Jenis</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Konfirmasi kepulangan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>23 Mei 2021</td>
                                                        <td>26 Mei 2021</td>
                                                        <td>Pergi</td>
                                                        <td><span class="badge badge-pill badge-success">Diterima Komdis</span></td>
                                                        <td><button type="button" class="btn btn-primary btn-sm">Kembali</button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
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