import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CardInfo from '../../components/Cards/Info';
import CardBasic from '../../components/Cards/Basic';
import PageHeading from '../../components/PageHeading';
import api from '../../service/api';

class DashboardWadir extends Component {
    constructor(){
        super();
        this.state = {
            alfaA: '',
            hadirA: '',
            izinA: '',
            mhsA: '',
            pengurusA: '',

            alfaB: '',
            hadirB: '',
            izinB: '',
            mhsB: '',
            pengurusB: '',

            alfaC: '',
            hadirC: '',
            izinC: '',
            mhsC: '',
            pengurusC: '',
        }
    }

    async componentDidMount(){
        await api().get('api/presensi/dashboard').then(response =>{
            if(response.data.status == 'success'){
                this.setState({
                    alfaA: response.data.gedungA[0],
                    hadirA: response.data.gedungA[1],
                    izinA: response.data.gedungA[2],
                    mhsA: response.data.gedungA[3],
                    pengurusA: response.data.gedungA[4],

                    alfaB: response.data.gedungB[0],
                    hadirB: response.data.gedungB[1],
                    izinB: response.data.gedungB[2],
                    mhsB: response.data.gedungB[3],
                    pengurusB: response.data.gedungB[4],

                    alfaC: response.data.gedungC[0],
                    hadirC: response.data.gedungC[1],
                    izinC: response.data.gedungC[2],
                    mhsC: response.data.gedungC[3],
                    pengurusC: response.data.gedungC[4],

                    mengajukanA: '',
                    disetujuiA: '',
                    ditolakA: '',

                    mengajukanB: '',
                    disetujuiB: '',
                    ditolakB: '',

                    mengajukanC: '',
                    disetujuiC: '',
                    ditolakC: '',
                })
                console.log(response.data)
            }
            else{
                alert(response.data.message);
            }
        })

        api().get('api/perizinan/dashboard/3').then(response =>{
            if(response.data.status == 'success'){
                this.setState({
                    mengajukanA: response.data.gedungA[0],
                    disetujuiA: response.data.gedungA[1],
                    ditolakA: response.data.gedungA[2],

                    mengajukanB: response.data.gedungB[0],
                    disetujuiB: response.data.gedungB[1],
                    ditolakB: response.data.gedungB[2],

                    mengajukanC: response.data.gedungC[0],
                    disetujuiC: response.data.gedungC[1],
                    ditolakC: response.data.gedungC[2],
                })
                console.log(response.data)
            }
            else{
                alert(response.data.message);
            }
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <PageHeading title="Dashboard Wakil Direktur 3" />

                {/* Path */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>
                
                {/* ASRAMA A */}
                <div className="row">
                    <CardInfo title="Gedung Asrama"
                        icon="house-user"
                        color="primary"
                        value="A" />

                    <CardInfo title="Jumlah Mahasiswa"
                        icon="users"
                        color="primary"
                        value={this.state.mhsA} />

                    <CardInfo title="Jumlah Pengurus"
                        icon="users"
                        color="primary"
                        value={this.state.pengurusA} />
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <CardBasic title="Presensi" link="/rekapitulasi">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Status</th>
                                            <th scope="col" className="text-right">Jumlah mahasiswa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Hadir</td>
                                            <td className="text-right">{this.state.hadirA}</td>
                                        </tr>
                                        <tr>
                                            <td>Izin</td>
                                            <td className="text-right">{this.state.izinA}</td>
                                        </tr>
                                        <tr>
                                            <td>Alpa</td>
                                            <td className="text-right">{this.state.alfaA}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBasic>
                    </div>
                    <div className="col-lg-6">
                        <CardBasic title="Perizinan" link="/rekapitulasi">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Status</th>
                                            <th scope="col" className="text-right">Jumlah perizinan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Belum diproses</td>
                                            <td className="text-right">{this.state.mengajukanA}</td>
                                        </tr>
                                        <tr>
                                            <td>Disetujui</td>
                                            <td className="text-right">{this.state.disetujuiA}</td>
                                        </tr>
                                        <tr>
                                            <td>Ditolak</td>
                                            <td className="text-right">{this.state.ditolakA}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBasic>
                    </div>
                </div>
                <hr/>

                {/* ASRAMA B */}
                <div className="row">
                    <CardInfo title="Gedung Asrama"
                        icon="house-user"
                        color="primary"
                        value="B" />

                    <CardInfo title="Jumlah Mahasiswa"
                        icon="users"
                        color="primary"
                        value={this.state.mhsB} />

                    <CardInfo title="Jumlah Pengurus"
                        icon="users"
                        color="primary"
                        value={this.state.pengurusB} />
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <CardBasic title="Presensi" link="/rekapitulasi">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Status</th>
                                            <th scope="col" className="text-right">Jumlah mahasiswa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Hadir</td>
                                            <td className="text-right">{this.state.hadirB}</td>
                                        </tr>
                                        <tr>
                                            <td>Izin</td>
                                            <td className="text-right">{this.state.izinB}</td>
                                        </tr>
                                        <tr>
                                            <td>Alpa</td>
                                            <td className="text-right">{this.state.alfaB}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBasic>
                    </div>
                    <div className="col-lg-6">
                        <CardBasic title="Perizinan" link="/rekapitulasi">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Status</th>
                                            <th scope="col" className="text-right">Jumlah perizinan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Belum diproses</td>
                                            <td className="text-right">{this.state.mengajukanB}</td>
                                        </tr>
                                        <tr>
                                            <td>Disetujui</td>
                                            <td className="text-right">{this.state.disetujuiB}</td>
                                        </tr>
                                        <tr>
                                            <td>Ditolak</td>
                                            <td className="text-right">{this.state.ditolakB}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBasic>
                    </div>
                </div>
                <hr/>

                {/* ASRAMA C */}
                <div className="row">
                    <CardInfo title="Gedung Asrama"
                        icon="house-user"
                        color="primary"
                        value="C" />

                    <CardInfo title="Jumlah Mahasiswa"
                        icon="users"
                        color="primary"
                        value={this.state.mhsC} />

                    <CardInfo title="Jumlah Pengurus"
                        icon="users"
                        color="primary"
                        value={this.state.pengurusC} />
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <CardBasic title="Presensi" link="/rekapitulasi">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Status</th>
                                            <th scope="col" className="text-right">Jumlah mahasiswa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Hadir</td>
                                            <td className="text-right">{this.state.hadirC}</td>
                                        </tr>
                                        <tr>
                                            <td>Izin</td>
                                            <td className="text-right">{this.state.izinC}</td>
                                        </tr>
                                        <tr>
                                            <td>Alpa</td>
                                            <td className="text-right">{this.state.alfaC}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBasic>
                    </div>
                    <div className="col-lg-6">
                        <CardBasic title="Perizinan" link="/rekapitulasi">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Status</th>
                                            <th scope="col" className="text-right">Jumlah perizinan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Belum diproses</td>
                                            <td className="text-right">{this.state.mengajukanC}</td>
                                        </tr>
                                        <tr>
                                            <td>Disetujui</td>
                                            <td className="text-right">{this.state.disetujuiC}</td>
                                        </tr>
                                        <tr>
                                            <td>Ditolak</td>
                                            <td className="text-right">{this.state.ditolakC}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBasic>
                    </div>
                </div>

            </div>
        );
    }
}

export default DashboardWadir;