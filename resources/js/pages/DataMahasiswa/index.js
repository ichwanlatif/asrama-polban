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

            // delete
            checkedBoxes: [],
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });

        api().get('api/mahasiswa').then(response =>{
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

    toggleCheckbox(e, item){
        let arr = this.state.checkedBoxes;		
        if(e.target.checked) {
            arr.push(item.id_mhs);
            this.setState({ checkedBoxes : arr });
        } else {			
            arr.splice(this.state.checkedBoxes.indexOf(item.id_mhs), 1);
            this.setState({ checkedBoxes: arr });
        }	
        console.log("Delete count: "+this.state.checkedBoxes.length);
    }

    async handleDelete(e){
        e.preventDefault();
        console.log(this.state.checkedBoxes)
        await api().post('api/mahasiswa/delete', ({
            listMhs: this.state.checkedBoxes,
        })).then(response => {
            if(response.data.status == 'success'){
                alert(response.data.message);
                window.location.reload();
            }
            else{
                alert(response.data.message);
            }
        })
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

                            {/* Path */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Data Mahasiswa</li>
                                </ol>
                            </nav>

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

                                        <div className="row">
                                            {/* Hapus mahasiswa */}
                                            <button onClick={this.handleDelete} className="btn btn-danger btn-icon-split mb-2 mx-2">
                                                <span className="icon text-white-50">
                                                    <i className="fas fa-trash-alt"></i>
                                                </span>
                                                <span className="text">Hapus mahasiswa({this.state.checkedBoxes.length})</span>
                                            </button>

                                            {/* Tambah mahasiswa */}
                                            <Link to="/tambah-mahasiswa" className="btn btn-primary btn-icon-split mb-2 mx-2">
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
                                                        <th></th>
                                                        <th scope="col">Nama</th>
                                                        <th scope="col">NIM</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Asal</th>
                                                        <th scope="col">Kamar</th>
                                                        <th scope="col">Peran</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentData.map(function(mahasiswa, index) {
                                                        let status;
                                                        if(mahasiswa.status_keaktifan == 1){
                                                            status = "Aktif"
                                                        }
                                                        else{
                                                            status = "Tidak Aktif"
                                                        }

                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <input 
                                                                        type="checkbox" 
                                                                        value={mahasiswa.id_mhs} 
                                                                        checked={this.state.checkedBoxes.includes(mahasiswa.id_mhs)?"checked":""} 
                                                                        onChange={(e) => this.toggleCheckbox(e, mahasiswa)}>
                                                                    </input>
                                                                </td>
                                                                <td>{mahasiswa.nama_mhs}</td>
                                                                <td>{mahasiswa.nim}</td>
                                                                <td>{mahasiswa.email}</td>
                                                                <td>{mahasiswa.keterangan_asal}</td>
                                                                <td>{mahasiswa.nama_gedung}-{mahasiswa.no_kamar}</td>
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
                                                        )}.bind(this))
                                                    }
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