import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';
import Pagination from "react-js-pagination";

import PageHeading from '../../components/PageHeading';
import api from '../../service/api';

class DataIzinPulang extends Component {
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
        var role = localStorage.getItem("user_role")
        this.setState({
            role: role
        });

        api().get('api/perizinan/' + role).then(response =>{
            if(response.data.status == 'success'){
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
        const data = this.state.datas

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
            TableStatus = <h6 className="text-center">Tidak ada izin yang perlu diproses</h6>;
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
                            <PageHeading title="Data Izin Pulang Asrama" />

                            {/* Path */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Data Izin Pulang</li>
                                </ol>
                            </nav>

                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Data Izin Pulang Asrama</h6>
                                    </div>
                                    <div className="card-body">

                                        {/* Search Bar */}
                                        <div className="input-group mb-2 border rounded-pill p-1 col-lg-4 col-md-8 col-sm-12">
                                            <input type="text" name="searchValue" placeholder="Cari mahasiswa.." className="form-control bg-none border-0" onChange={this.handleSearchChange}/>
                                            <div className="input-group-append border-0">
                                                <button type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
                                            </div>
                                        </div>

                                        {/* Tabel Izin Pulang */}
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nama</th>
                                                        <th scope="col">Mulai</th>
                                                        <th scope="col">Berakhir</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Proses</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {currentData.map(perizinan => {
                                                        const {
                                                            id_perizinan,
                                                            nama_mhs,
                                                            tanggal_pergi,
                                                            tanggal_pulang,
                                                            status_izin
                                                        } = perizinan;
                                                        let status;
                                                        switch (perizinan.status_izin) {
                                                            case '0':
                                                                status = "Mengajukan"
                                                                break;
                                                            case '1':
                                                                status = "Disetujui Pengelola"
                                                                break;
                                                            case '2':
                                                                status = "Ditolak Pengelola"
                                                                break;
                                                            case '3':
                                                                status = "Disetujui Wadir 3"
                                                                break;
                                                            case '4':
                                                                status = "Ditolak Wadir 3"
                                                                break;
                                                            default:
                                                                status = "Error"
                                                                break;
                                                        }
                                                        let approve;
                                                        let btnPengelola = this.state.role == 2 && perizinan.status_izin == 0;
                                                        let btnWadir = (this.state.role == 3 && (perizinan.status_izin == 0 || perizinan.status_izin ==1));
                                                        if ( btnPengelola || btnWadir){
                                                            approve=<td><Link to={"/form-approval-izin-pulang/" + perizinan.id_perizinan} className="btn btn-outline-primary btn-sm">Approve</Link></td>;
                                                        }else{
                                                            approve=<td></td>;
                                                        }
                                                        return (
                                                            <tr>
                                                                <td>{perizinan.nama_mhs}</td>
                                                                <td>{perizinan.tanggal_pergi}</td>
                                                                <td>{perizinan.tanggal_pulang}</td>
                                                                <td>{status}</td>
                                                                {approve}
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

export default DataIzinPulang;