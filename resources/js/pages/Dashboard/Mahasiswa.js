import React, { Component } from 'react';

import CardInfo from '../../components/Cards/Info';
import PageHeading from '../../components/PageHeading';
import api from '../../service/api';

class DashboardMahasiswa extends Component {
    constructor(){
        super();
        this.state = {
            alfa: "",
            hadir: "",
            izin: "",
            gedung: ""
        };
    }

    componentDidMount(){
        
        api().get('api/presensi/getRekapitulasiById/' + localStorage.getItem('user_id')).then(response =>{
            if(response.data.status === 'success'){
                this.setState({
                    alfa: response.data.alfa,
                    hadir: response.data.hadir,
                    izin: response.data.izin,
                    gedung: response.data.mahasiswa.nama_gedung
                })
                console.log(this.state)
            }
            else{
                alert(response.data.msg);
            }
        })

    }
    
    render() {
        return (
            <div className="container-fluid">
                <PageHeading title="Dashboard Mahasiswa" />
                <div className="row">
                    <CardInfo title="Gedung Asrama"
                        icon="house-user"
                        color="primary"
                        value={this.state.gedung} />

                    <CardInfo title="Jumlah Hadir"
                        icon="calendar-check"
                        color="success"
                        value={this.state.hadir} />

                    <CardInfo title="Jumlah Alfa"
                        icon="calendar-times"
                        color="danger"
                        value={this.state.alfa} />

                    <CardInfo title="Jumlah Izin"
                        icon="address-book"
                        color="info"
                        value={this.state.izin} />
                </div>
            </div>
        );
    }
}

export default DashboardMahasiswa;