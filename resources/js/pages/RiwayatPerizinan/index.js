import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HaversineGeolocation from 'haversine-geolocation';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

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
                alert(response.data.msg);
            }
        })

        api().get('api/resign/riwayatresign/' + localStorage.getItem('user_id')).then(resign => {
            if(resign.data.status === 'success'){
                this.setState({
                    datasResign: resign.data.data
                })
            }
            else{
                alert(resign.data.msg);
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

    render() {
        const dataIzin = this.state.datasIzin
        const dataResign = this.state.datasResign
        let TableStatus;

        if (this.state.datasIzin.length == 0 && this.state.datasResign.length == 0) {
            TableStatus = <h6 className="text-center">Tidak ada perizinan</h6>;
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
                            <PageHeading title="Riwayat Perizinan" />
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
                                                    {dataResign.map(resign => {
                                                        const {
                                                            id,
                                                            tanggal_resign,
                                                            keterangan_resign,
                                                            status_resign
                                                        } = resign;
                                                        let statusResign;
                                                        switch (resign.status_resign) {
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
                                                                statusResign = "Error"
                                                                break;
                                                        }
                                                        return (
                                                            <tr>
                                                                <td>{resign.tanggal_resign}</td>
                                                                <td> - </td>
                                                                <td>Resign</td>
                                                                <td>{statusResign}</td>
                                                                <td> - </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    {dataIzin.map(perizinan => {
                                                        const {
                                                            id_perizinan,
                                                            tanggal_pergi,
                                                            tanggal_pulang,
                                                            status_izin
                                                        } = perizinan;
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
                                                                break;
                                                            case 8:
                                                                status = "Disetujui Kembali oleh Wadir 3"
                                                                hiddenKonfirmasi = false;
                                                                break;
                                                            case 9:
                                                                status = "Ditolak Kembali oleh Wadir 3"
                                                                break;
                                                            case 10:
                                                                status = "Terkonfirmasi Kembali"
                                                                break;
                                                            default:
                                                                status = "Error"
                                                                break;
                                                        }
                                                        return (
                                                            <tr>
                                                                <td>{perizinan.tanggal_pergi}</td>
                                                                <td>{perizinan.tanggal_pulang}</td>
                                                                <td>Pergi</td>
                                                                <td>{status}</td>
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

export default RiwayatPerizinan;