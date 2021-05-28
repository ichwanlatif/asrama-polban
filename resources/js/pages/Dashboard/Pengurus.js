import React, { Component } from 'react';

import CardInfo from '../../components/Cards/Info';
import CardBasic from '../../components/Cards/Basic';
import PageHeading from '../../components/PageHeading';

class DashboardPengurus extends Component {
    render() {
        return (
            <div className="container-fluid">
                <PageHeading title="Dashboard Pengurus" />
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
                        <CardBasic title="Presensi">
                            <div className="float-left font-weight-bold">Status</div>
                            <div class="float-right font-weight-bold">Jumlah mahasiswa</div>
                            <br />
                            <hr />
                            <div className="float-left">Hadir</div>
                            <div class="float-right">50</div>
                            <br />
                            <hr />
                            <div className="float-left">Alfa</div>
                            <div class="float-right">6</div>
                            <br />
                            <hr />
                            <div className="float-left">Izin</div>
                            <div class="float-right">4</div>
                        </CardBasic>
                    </div>
                    <div className="col-lg-6">
                        <CardBasic title="Perizinan">
                        <div className="float-left font-weight-bold">Status</div>
                            <div class="float-right font-weight-bold">Jumlah perizinan</div>
                            <br />
                            <hr />
                            <div className="float-left">Belum diproses</div>
                            <div class="float-right">1</div>
                            <br />
                            <hr />
                            <div className="float-left">Disetujui</div>
                            <div class="float-right">4</div>
                            <br />
                            <hr />
                            <div className="float-left">Ditolak</div>
                            <div class="float-right">2</div>
                        </CardBasic>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardPengurus;