import React, { Component } from 'react';

import CardInfo from '../../components/Cards/Info';
import CardBasic from '../../components/Cards/Basic';
import PageHeading from '../../components/PageHeading';

class DashboardManajemen extends Component {
    render() {
        return (
            <div className="container-fluid">
                <PageHeading title="Dashboard Manajemen" />

                {/* ASRAMA A */}
                <div className="row">
                    <CardInfo title="Gedung Asrama"
                        icon="house-user"
                        color="primary"
                        value="A" />

                    <CardInfo title="Jumlah Mahasiswa"
                        icon="users"
                        color="primary"
                        value="60" />

                    <CardInfo title="Jumlah Pengurus"
                        icon="users"
                        color="primary"
                        value="2" />
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
                                            <td className="text-right">60</td>
                                        </tr>
                                        <tr>
                                            <td>Izin</td>
                                            <td className="text-right">4</td>
                                        </tr>
                                        <tr>
                                            <td>Alfa</td>
                                            <td className="text-right">5</td>
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
                                            <td className="text-right">1</td>
                                        </tr>
                                        <tr>
                                            <td>Disetujui</td>
                                            <td className="text-right">4</td>
                                        </tr>
                                        <tr>
                                            <td>Ditolak</td>
                                            <td className="text-right">2</td>
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

export default DashboardManajemen;