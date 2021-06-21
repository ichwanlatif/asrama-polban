import React, { Component } from 'react';
import { createPresensi } from '../../service/presensi';
import api from '../../service/api';
//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

import MapView from '../../components/Map/MapView';

class FormPresensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role:"1",
            lat: 0,
            long: 0,
            currentDateTime: new Date().toLocaleString(),
            status_location: "Belum mendapatkan lokasi",
            text_color : "text-warning",
            
        };
        this.onClickGetLocation = this.onClickGetLocation.bind(this);
        this.submitPresensi = this.submitPresensi.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentDateTime: new Date().toLocaleString(),
                role: localStorage.getItem("user_role")
            })
        }, 1000)
        if(new Date().toLocaleTimeString() < "12.59.00" || new Date().toLocaleTimeString() > "22.01.00"){
            alert("Tidak Dalam Waktu Presensi")
            window.location.assign('/#/dashboard')
        }
        else{
            api().get('api/perizinan/checkPerizinan/' + localStorage.getItem('user_id')).then(response =>{
                if(response.data.status === 'success'){
                    alert('Anda Sedang Izin')
                    window.location.assign('/#/dashboard')
                }
            })

            api().get('api/presensi/kehadiranToday/' + localStorage.getItem('user_id')).then(today =>{
                if(today.data.status === 'success'){
                    alert('Anda Telah Melakukan Presensi');
                    document.getElementById("submit").disabled = true;
                    document.getElementById("submit").className = "btn btn-success"
                }
            })
        }
    }

    onClickGetLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    status_location: "Sudah mendapatkan lokasi",
                    text_color : "text-success"
                })
            }))
        }
        else{
            alert('Browser anda tidak support')
        }
    }

    submitPresensi(e){
        e.preventDefault()
        console.log(this.state.lat)
        createPresensi({
            latitude: this.state.lat,
            longitude: this.state.long,
            id_mhs: localStorage.getItem('user_id')
        })
    }

    render() {
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
                            <PageHeading title="Presensi Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h4 className="text-primary text-center">Formulir presensi</h4>
                                        <h6 className="text-center text-muted">Isi data formulir presensi dibawah ini</h6>
                                        <hr></hr>

                                        {/* Form presensi*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="time" className="col-md-3 col-form-label text-md-right">Waktu presensi</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        value={this.state.currentDateTime}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="coordinat" className="col-md-3 col-form-label text-md-right">Koordinat presensi</label>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="coordinat"
                                                        value={this.state.lat + ", " + this.state.long}
                                                        readOnly
                                                    />
                                                    <MapView
                                                        lat={this.state.lat}
                                                        lng={this.state.long}
                                                    />
                                                    {/* Conditional statement */}
                                                    <small className="text-muted">Status: </small>
                                                    <small className={this.state.text_color}>{this.state.status_location}</small>
                                                </div>
                                                {/* <div className="form-group row">
                                                    <Map latitude={this.state.lat} longitude={this.state.long} />
                                                </div> */}
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-4">
                                                    <button className="btn btn-primary" type="button" onClick={this.onClickGetLocation}>Ambil lokasi</button>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-2">
                                                    <button id="submit" onClick={this.submitPresensi} type='submit' className='btn btn-success'>Submit</button>
                                                </div>
                                            </div>
                                        </form>

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

export default FormPresensi;