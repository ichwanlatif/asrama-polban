import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';
import Pagination from "react-js-pagination";

import PageHeading from '../../components/PageHeading';
import api from '../../service/api';

class DataIzinKembali extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            datas: [],

            // pagination
            currentData: [],
            activePage: 1,
            itemPerPage : 10
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

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});

        const data = this.state.datas;
        const offset = (this.state.activePage - 1) * this.state.itemPerPage;
        const currentData = data.slice(offset, offset + this.state.itemPerPage);

        this.setState({ currentData });
    }

    render() {
        const data = this.state.datas

        // pagination
        const offset = (this.state.activePage - 1) * this.state.itemPerPage;
        const currentData = data.slice(offset, offset + this.state.itemPerPage);

        let TableStatus;
        if (this.state.datas.length == 0) {
            TableStatus = <h6 className="text-center">Tidak ada izin yang perlu diproses</h6>;
          } else {
            TableStatus = <h6>Menampilkan {this.state.itemPerPage * (this.state.activePage - 1) +1} sampai {this.state.itemPerPage * (this.state.activePage - 1) +currentData.length} dari {data.length}</h6>;
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
                                        <div className="d-flex justify-content-end">
                                            <Pagination
                                                itemClass="page-item"
                                                linkClass="page-link"
                                                activePage={this.state.activePage}
                                                itemsCountPerPage={this.state.itemPerPage}
                                                totalItemsCount={data.length}
                                                pageRangeDisplayed={3}
                                                onChange={this.handlePageChange.bind(this)}
                                            />
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

export default DataIzinKembali;