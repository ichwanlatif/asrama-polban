import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HaversineGeolocation from 'haversine-geolocation';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';
import Pagination from "react-js-pagination";

import PageHeading from '../../components/PageHeading';

import api from '../../service/api';
import { kembali } from '../../service/perizinan';
class RiwayatPerizinan extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            datasIzin: [],
            datasResign: [],

            // pagination
            currentData: [],
            activePage: 1,
            itemPerPage : 10
        };
        this.kembali = this.kembali.bind(this)
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
        api().get('api/perizinan/riwayatperizinan/' + localStorage.getItem('user_id')).then(response =>{
            if(response.data.status === 'success'){
                this.setState({
                    datasIzin: response.data.data
                })
            }
            else{
                alert(response.data.message);
            }
        })

        api().get('api/resign/riwayatresign/' + localStorage.getItem('user_id')).then(resign => {
            if(resign.data.status === 'success'){
                this.setState({
                    datasResign: resign.data.data
                })
            }
            else{
                alert(resign.data.message);
            }
        })
    }

    kembali(id){
        console.log(id)
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position => {
                this.setState({
                    lat: -6.872161,
                    long: 107.570858

                    // lat: position.coords.latitude,
                    // long: position.coords.longitude,
                })
                console.log("Lat: " + this.state.lat)
                console.log("Long: " + this.state.long)
                const points = [
                    {
                        latitude: this.state.lat,
                        longitude: this.state.long
                    },
                    {
                        latitude: -6.871925383063508, 
                        longitude: 107.57102532659914,
                    }
                ]
                let hasil = HaversineGeolocation.getDistanceBetween(points[0], points[1], 'm');
                console.log(hasil);
                if(hasil > 50){
                    alert('Anda Sedang Berada di Luar Asrama');
                }
                else{
                    kembali({
                        id: id,
                        id_mhs: localStorage.getItem('user_id')
                    })
                }
            }))

            
        }
        else{
            alert('Browser anda tidak support')
        }

    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});

        const data = [...dataIzin, ...dataResign];
        const offset = (this.state.activePage - 1) * this.state.itemPerPage;
        const currentData = data.slice(offset, offset + this.state.itemPerPage);

        this.setState({ currentData });
    }

    render() {
        const dataIzin = this.state.datasIzin
        const dataResign = this.state.datasResign
        const data = [...dataResign, ...dataIzin];

        // pagination
        const offset = (this.state.activePage - 1) * this.state.itemPerPage;
        const currentData = data.slice(offset, offset + this.state.itemPerPage);

        let TableStatus;
        if (this.state.datasIzin.length == 0 && this.state.datasResign.length == 0) {
            TableStatus = <h6 className="text-center">Tidak ada perizinan</h6>;
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
                            <PageHeading title="Riwayat Perizinan" />

                            {/* Path */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Riwayat Perizinan</li>
                                </ol>
                            </nav>
                            
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Riwayat Perizinan</h6>
                                    </div>

                                    <div className="card-body">

                                        {/* Tabel Perizinan */}
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Mulai</th>
                                                    <th scope="col">Berakhir</th>
                                                    <th scope="col">Jenis izin</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Konfirmasi kepulangan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {/* Resign */}
                                                    {currentData.map(perizinan => {
                                                        const {
                                                            id,
                                                            tanggal_resign,
                                                            keterangan_resign,
                                                            status_resign,

                                                            id_perizinan,
                                                            tanggal_pergi,
                                                            tanggal_pulang,
                                                            status_izin,
                                                        } = perizinan;
                                                        let statusResign;
                                                        switch (perizinan.status_resign) {
                                                            case 0:
                                                                statusResign = "Mengajukan"
                                                                break;
                                                            case 1:
                                                                statusResign = "Disetujui Pengelola"
                                                                break;
                                                            case 2:
                                                                statusResign = "Ditolak Pengelola"
                                                                break;
                                                            case 3:
                                                                statusResign = "Disetujui Wadir 3"
                                                                break;
                                                            case 4:
                                                                statusResign = "Ditolak Wadir 3"
                                                                break;
                                                            default:
                                                                statusResign = ""
                                                                break;
                                                        }
                                                        let status, hiddenKembali = true, hiddenKonfirmasi = true;
                                                        switch (perizinan.status_izin) {
                                                            case 0:
                                                                status = "Mengajukan"
                                                                break;
                                                            case 1:
                                                                status = "Disetujui Pengelola"
                                                                break;
                                                            case 2:
                                                                status = "Ditolak Pengelola"
                                                                break;
                                                            case 3:
                                                                status = "Disetujui Wadir 3"
                                                                hiddenKembali = false;
                                                                break;
                                                            case 4:
                                                                status = "Ditolak Wadir 3"
                                                                break;
                                                            case 5:
                                                                status = "Mengajukan Kembali"
                                                                break;
                                                            case 6:
                                                                status = "Disetujui Kembali oleh Pengelola"
                                                                break;
                                                            case 7:
                                                                status = "Ditolak Kembali oleh Pengelola"
                                                                hiddenKembali = false;
                                                                break;
                                                            case 8:
                                                                status = "Disetujui Kembali oleh Wadir 3"
                                                                hiddenKonfirmasi = false;
                                                                break;
                                                            case 9:
                                                                status = "Ditolak Kembali oleh Wadir 3"
                                                                hiddenKembali = false;
                                                                break;
                                                            case 10:
                                                                status = "Terkonfirmasi Kembali"
                                                                break;
                                                            default:
                                                                status = ""
                                                                break;
                                                        }
                                                        let jenis;
                                                        if(perizinan.tanggal_resign){
                                                            jenis = "Resign"
                                                        }else if(perizinan.tanggal_pulang){
                                                            jenis = "Pulang"
                                                        }

                                                        return (
                                                            <tr>
                                                                <td>{perizinan.tanggal_resign}{perizinan.tanggal_pergi}</td>
                                                                <td>{perizinan.tanggal_pulang}</td>
                                                                <td>{jenis}</td>
                                                                <td>{statusResign}{status}</td>
                                                                <td>
                                                                    <Link hidden={hiddenKembali} to={"/form-izin-kembali/" + perizinan.id_perizinan} className="btn btn-outline-primary btn-sm">Ajukan Perizinan Kembali</Link>
                                                                    <button hidden={hiddenKonfirmasi} onClick={() => this.kembali(perizinan.id_perizinan)} className="btn btn-outline-primary btn-sm">Konfirmasi Kembali</button>
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

export default RiwayatPerizinan;