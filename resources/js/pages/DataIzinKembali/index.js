import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';
import api from '../../service/api';

class DataIzinKembali extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            datas: []
        };
    }

    componentDidMount(){
        var role = localStorage.getItem("user_role")
        this.setState({
            role: role
        });

        api().get('api/perizinan/kembali/' + role).then(response =>{
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
        let TableStatus;

        if (this.state.datas.length == 0) {
            TableStatus = <h6 className="text-center">Tidak ada izin yang perlu diproses</h6>;
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
                            <PageHeading title="Data Izin Kembali Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Data Izin Kembali Asrama Yang Belum Diproses</h6>
                                    </div>
                                    <div className="card-body">

                                        {/* Search Bar */}
                                        <div className="input-group mb-2 border rounded-pill p-1 col-lg-4 col-md-8 col-sm-12">
                                            <input type="text" placeholder="Cari mahasiswa.." className="form-control bg-none border-0 font-italic"/>
                                            <div className="input-group-append border-0">
                                                <button type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
                                            </div>
                                        </div>

                                        {/* Tabel Izin Kembali */}
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Nama</th>
                                                    <th scope="col">Mulai</th>
                                                    <th scope="col">Pengajuan Kembali</th>
                                                    <th scope="col">Proses</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {data.map(perizinan => {
                                                        const {
                                                            id_perizinan,
                                                            nama_mhs,
                                                            tanggal_pergi,
                                                            pengajuan_tanggal_pulang,
                                                            status_izin
                                                        } = perizinan;
                                                        let status;
                                                        switch (perizinan.status_izin) {
                                                            case 5:
                                                                status = "Mengajukan Kembali"
                                                                break;
                                                            case 6:
                                                                status = "Disetujui Kembali oleh Pengelola"
                                                                break;
                                                            case 7:
                                                                status = "Ditolak Kembali oleh Pengelola"
                                                                break;
                                                            case 8:
                                                                status = "Disetujui Kembali oleh Wadir 3"
                                                                hiddenKonfirmasi = false;
                                                                break;
                                                            case 9:
                                                                status = "Ditolak Kembali oleh Wadir 3"
                                                                break;
                                                            default:
                                                                status = "Error"
                                                                break;
                                                        }
                                                        return (
                                                            <tr>
                                                                <td>{perizinan.nama_mhs}</td>
                                                                <td>{perizinan.tanggal_pergi}</td>
                                                                <td>{perizinan.pengajuan_tanggal_pulang}</td>
                                                                <td>{status}</td>
                                                                <td><Link to={"/form-approval-izin-kembali/" + perizinan.id_perizinan} className="btn btn-outline-primary btn-sm">Approve</Link></td>
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

export default DataIzinKembali;