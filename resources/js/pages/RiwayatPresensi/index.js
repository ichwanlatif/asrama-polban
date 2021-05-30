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
            role: localStorage.getItem('user_role'),
            datas: [],
        };
    }

    componentDidMount(){
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
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Tanggal</th>
                                                    <th scope="col">Waktu presensi</th>
                                                    <th scope="col">Jenis</th>
                                                    <th scope="col">Koordinat</th>
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
                                                                <td>Harian</td>
                                                                <td>{presensi.latitude + ', ' + presensi.longitude}</td>
                                                                <td><span class="badge badge-pill badge-success">{presensi.status ? "Hadir" : "Alfa"}</span></td>
                                                            </tr>
                                                        )
                                                    })}
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

export default RiwayatPresensi;