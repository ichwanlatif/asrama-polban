import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';
import Pagination from "react-js-pagination";

import PageHeading from '../../components/PageHeading';

import api from '../../service/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import moment from 'moment';

class Rekapitulasi extends Component {
    constructor(){
        super();
        this.state = {
            role: localStorage.getItem("user_role"),
            datas: [],
            date_from: moment().format('YYYY-MM-DD'),
            date_to: moment().add(1,'days').format('YYYY-MM-DD'),

            // pagination
            currentData: [],
            activePage: 1,
            itemPerPage : 10,

            // search
            searchData: [],
            searchValue :"",
        };
        this.handleGetDataByRange = this.handleGetDataByRange.bind(this)
        this.getDataRekap = this.getDataRekap.bind(this)
        this.unduhRekapitulasi = this.unduhRekapitulasi.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    }

    handleGetDataByRange(e){
        e.preventDefault()
        this.getDataRekap();
    }

    componentDidMount(){
        console.log(this.state)
        this.getDataRekap();
    }

    getDataRekap(){
        api().get('api/presensi/getRekapitulasi/'+this.state.date_from+'/'+this.state.date_to).then(response =>{
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

    unduhRekapitulasi(){
        const doc = new jsPDF('portrait', 'cm', 'a4')
        const headers = [["NAMA", "NIM", "GEDUNG", "JENIS", "JABATAN", "ALFA", "IZIN", "HADIR"]];
        const data = this.state.datas.map(rekap=> [rekap.nama_mhs, rekap.nim, rekap.nama_gedung, rekap.keterangan_asal, rekap.role_mhs, rekap.alfa, rekap.izin, rekap.hadir]);

        let content = {
            startY: 5,
            head: headers,
            body: data
        }

        doc.text("REKAPITULASI PRESENSI MAHASISWA", 10.5, 1, {align: 'center'});
        doc.text("POLITEKNIK NEGERI BANDUNG", 10.5, 2, {align: 'center'});
        doc.setFontSize(12)
        doc.text("PERIODE: " + this.state.date_from + " s.d " + this.state.date_to, 1.5, 4.7, {align: 'left'})
        doc.autoTable(content)
        doc.save("Rekapitulasi Mahasiswa.pdf")

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
            TableStatus = <h6 className="text-center">Tidak ada data mahasiswa</h6>;
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
                            <PageHeading title="Rekapitulasi Data Mahasiswa" />

                            {/* Path */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Rekapitulasi</li>
                                </ol>
                            </nav>

                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Rekapitulasi Presensi Dan Perizinan Mahasiswa</h6>
                                    </div>
                                    <div className="card-body">

                                        <div className="row">
                                            {/* Unduh file */}
                                            <button onClick={this.unduhRekapitulasi} className="btn btn-light btn-icon-split mb-2 mx-2">
                                                <span className="icon text-gray-600">
                                                    <i className="fas fa-file-download"></i>
                                                </span>
                                                <span className="text">Unduh rekap</span>
                                            </button>
                                        </div>

                                        {/* Search Bar */}
                                        <div className="input-group mb-2 border rounded-pill p-1 col-lg-4 col-md-8 col-sm-12">
                                        <input type="text" name="searchValue" placeholder="Cari mahasiswa.." className="form-control bg-none border-0" onChange={this.handleSearchChange}/>
                                            <div className="input-group-append border-0">
                                                <button type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            {/* range tanggal */}
                                            <label for="startdate" className="col-lg-2 col-form-label">Tanggal mulai</label>
                                            <div className="col-lg-3 mb-2">
                                                <input onChange={this.handleFieldChange} name="date_from" type="date" className="form-control" value={this.state.date_from} />
                                            </div>

                                            <label for="startdate" className="col-lg-2 col-form-label">Tanggal akhir</label>
                                            <div className="col-lg-3 mb-2">
                                                <input onChange={this.handleFieldChange} name="date_to" type="date" className="form-control" value={this.state.date_to} />
                                            </div>

                                            <div className="col-lg-2 mb-2">
                                                <button onClick={this.handleGetDataByRange} className="btn btn-primary btn-icon-split">
                                                    <span className="icon text-white-50">
                                                        <i className="fas fa-filter"></i>
                                                    </span>
                                                    <span className="text">Filter</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Tabel Rekap */}
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Nama</th>
                                                    <th scope="col">NIM</th>
                                                    <th scope="col">Kamar</th>
                                                    <th scope="col">Jenis</th>
                                                    <th scope="col">Peran</th>
                                                    <th scope="col">Alpa</th>
                                                    <th scope="col">Izin</th>
                                                    <th scope="col">Hadir</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentData.map(rekap =>{
                                                        const {
                                                            nama_mhs,
                                                            nim,
                                                            no_kamar,
                                                            nama_gedung,
                                                            keterangan_asal,
                                                            role_mhs,
                                                            alfa,
                                                            hadir,
                                                            izin,
                                                        } = rekap;
                                                        
                                                        return (
                                                            <tr>
                                                                <td>{rekap.nama_mhs}</td>
                                                                <td>{rekap.nim}</td>
                                                                <td>{rekap.nama_gedung}-{rekap.no_kamar}</td>
                                                                <td>{rekap.keterangan_asal}</td>
                                                                <td>{rekap.role_mhs}</td>
                                                                <td>{rekap.alfa}</td>
                                                                <td>{rekap.izin}</td>
                                                                <td>{rekap.hadir}</td>
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

export default Rekapitulasi;