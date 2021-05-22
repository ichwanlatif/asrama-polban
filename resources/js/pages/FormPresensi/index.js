import React, { Component } from 'react';
import { createPresensi } from '../../service/presensi';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

class FormPresensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            long: 0,
            currentDateTime: new Date().toLocaleString(),
            status_location: "Belum mendapatkan lokasi"
        };
        this.onClickGetLocation = this.onClickGetLocation.bind(this);
        this.submitPresensi = this.submitPresensi.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentDateTime: new Date().toLocaleString()
            })
        }, 1000)
    }

    onClickGetLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    status_location: "Sudah mendapatkan lokasi"
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
            user_id: localStorage.getItem('user_id')
        })
    }

    render() {
        return (
            <div>
                <div id="wrapper">
                {/* <!-- Sidebar --> */}
                <Sidebar />
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
                                        <h1 className="card-title text-center">Form presensi</h1>
                                        <h6 className="text-center text-muted">Isi data formulir presensi dibawah ini</h6>
                                        <hr></hr>

                                        {/* Form presensi*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="name" className="col-md-4 col-form-label text-md-right">Waktu presensi</label>
                                                <div className="col-md-6">
                                                    <p>
                                                        {this.state.currentDateTime}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="name" className="col-md-4 col-form-label text-md-right">Koordinat presensi</label>
                                                <div className="col-md-6">
                                                    <input
                                                        id="coordinat"
                                                        type="text"
                                                        className="form-control"
                                                        name="coordinat"
                                                        value={this.state.lat + ", " + this.state.long}
                                                        readOnly
                                                    />
                                                    {/* Conditional statement */}
                                                    <small className="text-muted">Status: </small>
                                                    <small className="text-warning">{this.state.status_location}</small>
                                                </div>
                                                {/* <div className="form-group row">
                                                    <Map latitude={this.state.lat} longitude={this.state.long} />
                                                </div> */}
                                            </div>
                                            <div className="form-group row mb-0">
                                                <div className="col-md-6 offset-md-4">
                                                    <button className="btn btn-primary" type="button" onClick={this.onClickGetLocation}>Get location</button>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <div className="col-md-6 offset-md-4 mt-5">
                                                    <button onClick={this.submitPresensi} type="submit" className="btn btn-success">
                                                        Presensi
                                                    </button>
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