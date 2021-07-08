import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

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
            date_to: moment().add(1,'days').format('YYYY-MM-DD')
        };
        this.handleGetDataByRange = this.handleGetDataByRange.bind(this)
        this.getDataRekap = this.getDataRekap.bind(this)
        this.unduhRekapitulasi = this.unduhRekapitulasi.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
    }

    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
        console.log(name, value);
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
                alert(response.data.msg);
            }
        })
    }

    unduhRekapitulasi(){
        const doc = new jsPDF('portrait', 'cm', 'a4')
        const headers = [["NAMA", "NIM", "GEDUNG", "JENIS", "JABATAN", "ALFA", "IZIN", "HADIR", "STATUS", "TANGGAL RESIGN"]];
        const data = this.state.datas.map(rekap=> [rekap.nama_mhs, rekap.nim, rekap.nama_gedung, rekap.keterangan_asal, rekap.role_mhs, rekap.alfa, rekap.izin, rekap.hadir, rekap.status_keaktifan, rekap.tanggal_resign]);

        let content = {
            startY: 5,
            head: headers,
            body: data
        }

        doc.text("REKAPITULASI PRESENSI MAHASISWA", 10.5, 1, {align: 'center'});
        doc.text("POLITEKNIK NEGERI BANDUNG", 10.5, 2, {align: 'center'});
        doc.autoTable(content)
        doc.setFontSize(12)
        doc.text("PERIODE: " + this.state.date_from + " s.d " + this.state.date_to, 1.5, 4.7, {align: 'left'})
        doc.save("Rekapitulasi Mahasiswa.pdf")

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
                            <PageHeading title="Rekapitulasi Presensi Kehadiran" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Rekapitulasi Presensi Kehadiran</h6>
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
                                            {/* range tanggal */}
                                            <input onChange={this.handleFieldChange} name="date_from" type="date" className="form-control bg-none border-0 font-italic" value={this.state.date_from} />
                                             - 
                                            <input onChange={this.handleFieldChange} name="date_to" type="date" className="form-control bg-none border-0 font-italic" value={this.state.date_to} />
                                            <button onClick={this.handleGetDataByRange} className="btn btn-link text-primary">GET</button>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            {/* Unduh file */}
                                            <button onClick={this.unduhRekapitulasi} className="btn btn-light btn-icon-split mb-2 justify-content-end">
                                                <span className="icon text-gray-600">
                                                    <i className="fas fa-file-download"></i>
                                                </span>
                                                <span className="text">Unduh rekap</span>
                                            </button>
                                        </div>

                                        {/* Tabel Rekap */}
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Nama</th>
                                                    <th scope="col">NIM</th>
                                                    <th scope="col">Gedung</th>
                                                    <th scope="col">Jenis</th>
                                                    <th scope="col">Jabatan</th>
                                                    <th scope="col">Alfa</th>
                                                    <th scope="col">Izin</th>
                                                    <th scope="col">Hadir</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Tangal resign</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map(rekap =>{
                                                        const {
                                                            nama_mhs,
                                                            nim,
                                                            nama_gedung,
                                                            keterangan_asal,
                                                            role_mhs,
                                                            alfa,
                                                            hadir,
                                                            izin,
                                                            status_keaktifan,
                                                            tanggal_resign
                                                        } = rekap;
                                                        let resign = "-"
                                                        if(rekap.tanggal_resign !== null){
                                                            resign = rekap.tanggal_resign.tanggal_resign
                                                        }
                                                        return (
                                                            <tr>
                                                                <td>{rekap.nama_mhs}</td>
                                                                <td>{rekap.nim}</td>
                                                                <td>{rekap.nama_gedung}</td>
                                                                <td>{rekap.keterangan_asal}</td>
                                                                <td>{rekap.role_mhs}</td>
                                                                <td>{rekap.alfa}</td>
                                                                <td>{rekap.izin}</td>
                                                                <td>{rekap.hadir}</td>
                                                                <td>{rekap.status_keaktifan}</td>
                                                                <td>{resign}</td>
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

export default Rekapitulasi;