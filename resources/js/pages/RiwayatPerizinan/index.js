import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

import api from '../../service/api';
class RiwayatPerizinan extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            datas: [],
        };
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
        api().get('api/perizinan/' + localStorage.getItem('user_id')).then(response =>{
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
                                                    {data.map(perizinan => {
                                                        const {
                                                            id,
                                                            tanggal_pergi,
                                                            tanggal_pulang,
                                                            status_izin
                                                        } = perizinan;
                                                        let status, hidden;
                                                        if(perizinan.status_izin === 0){
                                                            status = "Mengajukan"
                                                            hidden = true
                                                        }
                                                        else if(perizinan.status_izin === 1){
                                                            status = "Disetujui Koordinator"
                                                            hidden = false
                                                        }
                                                        else if(perizinan.status_izin === 2){
                                                            status = "Ditolak"
                                                            hidden = true
                                                        }
                                                        else if(perizinan.status_izin === 3){
                                                            status = "Sudah Kembali"
                                                            hidden = true
                                                        }
                                                        else if(perizinan.status_izin === 4){
                                                            status = "Terkonfirmasi Kembali"
                                                            hidden = true
                                                        }
                                                        return (
                                                            <tr>
                                                                <td>{perizinan.tanggal_pergi}</td>
                                                                <td>{perizinan.tanggal_pulang}</td>
                                                                <td>Pergi</td>
                                                                <td>{status}</td>
                                                                <td><Link id="kembali" to="#" hidden={hidden} className="btn btn-outline-primary btn-sm">Kembali</Link></td>
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

export default RiwayatPerizinan;