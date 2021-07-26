import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

import api from '../../service/api';

class DataMahasiswa extends Component {
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

        api().get('api/mahasiswa').then(response =>{
            if(response.data.status === 'success'){
                this.setState({
                    datas: response.data.data
                })
                console.log(this.state.datas)
            }
            else{
                alert(response.data.message);
            }
        })
    }

    render() {

        const data = this.state.datas
        // let TableStatus;
        // if (this.state.datas.length == 0) {
        //     TableStatus = <h6 className="text-center">Tidak ada data Mahasiswa</h6>;
        //   } else {
        //     TableStatus = <h6>Menampilkan {this.state.itemPerPage * (this.state.activePage - 1) +1} sampai {this.state.itemPerPage * (this.state.activePage - 1) +currentData.length} dari {data.length}</h6>;
        // }

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
                            <PageHeading title="Data Mahasiswa Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Data Mahasiswa Asrama</h6>
                                    </div>
                                    <div className="card-body">

                                        {/* Search Bar */}
                                        <div className="input-group mb-2 border rounded-pill p-1 col-lg-4 col-md-8 col-sm-12">
                                            <input type="text" placeholder="Cari mahasiswa.." className="form-control bg-none border-0 font-italic"/>
                                            <div className="input-group-append border-0">
                                                <button type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            {/* Tambah mahasiswa */}
                                            <Link to="/tambah-mahasiswa" className="btn btn-primary btn-icon-split mb-2">
                                                <span className="icon text-white-50">
                                                    <i className="fas fa-user-plus"></i>
                                                </span>
                                                <span className="text">Tambah mahasiswa</span>
                                            </Link>
                                        </div>

                                        {/* Tabel Mahasiswa */}
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Nama</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Jenis</th>
                                                    <th scope="col">Gedung</th>
                                                    <th scope="col">Jabatan</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map(mahasiswa => {
                                                        const {
                                                            id_mhs,
                                                            nama_mhs,
                                                            nim,
                                                            email,
                                                            keterangan_asal,
                                                            nama_gedung,
                                                            role_mhs,
                                                            status_keaktifan
                                                        } = mahasiswa;
                                                        let status;
                                                        if(mahasiswa.status_keaktifan == 1){
                                                            status = "Aktif"
                                                        }
                                                        else{
                                                            status = "Tidak Aktif"
                                                        }

                                                        return (
                                                            <tr>
                                                                <td>{mahasiswa.nama_mhs}</td>
                                                                <td>{mahasiswa.nim}</td>
                                                                <td>{mahasiswa.email}</td>
                                                                <td>{mahasiswa.keterangan_asal}</td>
                                                                <td>{mahasiswa.nama_gedung}</td>
                                                                <td>{mahasiswa.role_mhs}</td>
                                                                <td>{status}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

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

export default DataMahasiswa;