import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';
import api from '../../service/api';
import { Tab } from 'bootstrap';
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
            if(response.data.status === 'success'){
                this.setState({
                    datas: response.data.data
                })
                console.log(this.state.datas)
            }
            else{
                alert(response.data.msg);
            }
        })
    }

    render() {
        const data = this.state.datas;
        let TableStatus;

        if (this.state.datas.length == 0) {
            TableStatus = <h6 className="text-center">Tidak ada presensi</h6>;
          } else {
            TableStatus = <h6 className="text-center"></h6>;
        }

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
                                                            status_presensi,
                                                            latitude,
                                                            longitude,
                                                            created_at,
                                                        } = presensi;
                                                        let status, color;
                                                        if(presensi.status_presensi === 0){
                                                            status = "Alfa"
                                                            color = "badge badge-pill badge-danger"
                                                        }
                                                        else if(presensi.status_presensi === 1){
                                                            status = "Hadir"
                                                            color = "badge badge-pill badge-success"
                                                        }
                                                        else{
                                                            status = "Izin"
                                                            color = "badge badge-pill badge-info"
                                                        }
                                                        return (
                                                            <tr>
                                                                <td>{new Date(presensi.created_at).toDateString()}</td>
                                                                <td>{new Date(presensi.created_at).toTimeString()}</td>
                                                                <td>{presensi.latitude + ', ' + presensi.longitude}</td>
                                                                <td>
                                                                    <span className={color}>{status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                        {TableStatus}

                                        {/* pagination */}
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-end">
                                                <li className="page-item">
                                                <Link className="page-link" to="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                    <span className="sr-only">Previous</span>
                                                </Link>
                                                </li>
                                                <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                                <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                                <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                                <li className="page-item">
                                                <Link className="page-link" to="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span className="sr-only">Next</span>
                                                </Link>
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