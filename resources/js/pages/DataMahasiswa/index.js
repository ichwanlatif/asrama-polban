import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';
import Pagination from "react-js-pagination";

import PageHeading from '../../components/PageHeading';

import api from '../../service/api';

class DataMahasiswa extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            datas: [],

            // pagination
            currentData: [],
            activePage: 1,
            itemPerPage : 10,

            // search
            searchData: [],
            searchValue :"",
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
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

    handleSearchChange(e){
        console.log(`search key is ${e.target.value}`);
        this.setState({searchValue: e.target.value});

        const searchData =
            this.state.datas.filter(mhs => {
                    return mhs.nama_mhs.toLowerCase().includes(this.state.searchValue.toLowerCase())
            }
        )
        this.setState( {searchData} );
        this.setState({activePage: 1});
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});

        const data = this.state.searchData;
        const offset = (this.state.activePage - 1) * this.state.itemPerPage;
        const currentData = data.slice(offset, offset + this.state.itemPerPage);

        this.setState({ currentData });
    }

    render() {

        const data = this.state.datas;

        //search
        const searchData =
            this.state.datas.filter(mhs => {
                    return mhs.nama_mhs.toLowerCase().includes(this.state.searchValue.toLowerCase())
            }
        )

        // pagination
        const offset = (this.state.activePage - 1) * this.state.itemPerPage;
        const currentData = searchData.slice(offset, offset + this.state.itemPerPage);

        let TableStatus;
        if (this.state.datas.length == 0) {
            TableStatus = <h6 className="text-center">Tidak ada data Mahasiswa</h6>;
          } else {
            TableStatus = <h6>Menampilkan {this.state.itemPerPage * (this.state.activePage - 1) +1} sampai {this.state.itemPerPage * (this.state.activePage - 1) +currentData.length} dari {searchData.length}</h6>;
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
                            <PageHeading title="Data Mahasiswa Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Data Mahasiswa Asrama</h6>
                                    </div>
                                    <div className="card-body">

                                        {/* Search Bar */}
                                        <div className="input-group mb-2 border rounded-pill p-1 col-lg-4 col-md-8 col-sm-12">
                                        <input type="text" name="searchValue" placeholder="Cari mahasiswa.." className="form-control bg-none border-0" onChange={this.handleSearchChange}/>
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
                                                    <th scope="col">NIM</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Asal</th>
                                                    <th scope="col">Gedung</th>
                                                    <th scope="col">Jabatan</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentData.map(mahasiswa => {
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
                                                                <td>
                                                                    <Link to={"/detail-mahasiswa/" + mahasiswa.id_mhs} className="text-primary mx-1">
                                                                        <i className="fas fa-info-circle"></i>
                                                                    </Link>
                                                                    <Link to={"/edit-mahasiswa/" + mahasiswa.id_mhs} className="text-success mx-1">
                                                                        <i className="fas fa-edit"></i>
                                                                    </Link>
                                                                </td>
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
                                                totalItemsCount={searchData.length}
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

export default DataMahasiswa;