import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';
import api from '../../service/api';
// import { getRiwayatPresensi } from '../../service/presensi';

class RiwayatPresensi extends Component {
    constructor(){
        super();
        this.state = {
            role: '',
            datas: [],
        };
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
        api().get('api/presensi/user/' + localStorage.getItem('user_id')).then(response =>{
            if(response.data.status === 201){
                this.setState({
                    datas: response.data.data
                })
                console.log(this.state.datas)
            }
            else{
                alert('Gagal load data');
            }
        })
    }

    render() {
        const data = this.state.datas
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
                            <PageHeading title="Riwayat Presensi Kehadiran" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Riwayat Presensi Kehadiran</h6>
                                    </div>
                                    <div className="card-body">

                                        {/* Tabel Presensi */}
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Tanggal</th>
                                                    <th scope="col">Waktu presensi</th>
                                                    <th scope="col">Koordinat GPS</th>
                                                    <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map(presensi => {
                                                        const {
                                                            id,
                                                            status,
                                                            latitude,
                                                            longitude,
                                                            created_at,
                                                        } = presensi;
                                                        return (
                                                            <tr>
                                                                <td>{new Date(presensi.created_at).toDateString()}</td>
                                                                <td>{new Date(presensi.created_at).toTimeString()}</td>
                                                                <td>{presensi.latitude + ', ' + presensi.longitude}</td>
                                                                <td>
                                                                    <span className={presensi.status ? "badge badge-pill badge-success" : "badge badge-pill badge-danger"}>{presensi.status ? "Hadir" : "Alfa"}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
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

export default RiwayatPresensi;