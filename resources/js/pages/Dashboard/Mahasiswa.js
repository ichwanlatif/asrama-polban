import React, { Component } from 'react';

import CardInfo from '../../components/Cards/Info';
import PageHeading from '../../components/PageHeading';

class DashboardMahasiswa extends Component {
    render() {
        return (
            <div className="container-fluid">
                <PageHeading title="Dashboard Mahasiswa" />
                <div className="row">
                    <CardInfo title="Gedung Asrama"
                        icon="house-user"
                        color="primary"
                        value="A" />

                    <CardInfo title="Jumlah Hadir"
                        icon="calendar-check"
                        color="success"
                        value="60" />

                    <CardInfo title="Jumlah Alfa"
                        icon="calendar-times"
                        color="danger"
                        value="5" />

                    <CardInfo title="Jumlah Izin"
                        icon="address-book"
                        color="info"
                        value="2" />
                </div>
            </div>
        );
    }
}

export default DashboardMahasiswa;