import React, { Component } from 'react';
import api from '../../service/api';
import HaversineGeolocation from 'haversine-geolocation';
//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

import MapView from '../../components/Map/MapView';

function loadingAnimation() {
    return new Promise(function(resolve) {
      setTimeout(() => resolve([1, 2, 3]), 1000);
    });
}

class FormPresensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role:"1",
            lat: 0,
            long: 0,
            status: 10,
            suhu_badan: 36.0,
            kondisi_kesehatan: "",
            currentDateTime: new Date().toLocaleString(),
            status_location: "Belum mendapatkan lokasi",
            text_color : "text-warning",
            
            //Err List
            errList: [],

            //loading
            isLoading:false,
            list: []
        };
        this.onClickGetLocation = this.onClickGetLocation.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.submitPresensi = this.submitPresensi.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentDateTime: new Date().toLocaleString(),
                role: localStorage.getItem("user_role")
            })
        }, 1000)
        if(new Date().toLocaleTimeString() < "15.59.00" || new Date().toLocaleTimeString() > "20.01.00"){
            alert("Tidak Dalam Waktu Presensi")
            window.location.assign('/#/dashboard')
        }
        else{
            api().get('api/perizinan/checkPerizinan/' + localStorage.getItem('user_id')).then(response =>{
                if(response.data.status === 'success'){
                    alert('Anda Sedang Izin')
                    window.location.assign('/#/dashboard')
                }
                else{
                    api().get('api/presensi/kehadiranToday/' + localStorage.getItem('user_id')).then(today =>{
                        if(today.data.status === 'success'){
                            alert('Anda Telah Melakukan Presensi');
                            window.location.assign('/#/dashboard')
                        }
                    })
                }
            })
        }
    }

    onClickGetLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position => {
                this.setState({
                    // lat: -6.872161,
                    // long: 107.570858

                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                })
                console.log("Lat: " + this.state.lat)
                console.log("Long: " + this.state.long)
                const points = [
                    {
                        latitude: this.state.lat,
                        longitude: this.state.long
                    },
                    {
                        latitude: -6.8719714, 
                        longitude: 107.5711026,
                    }
                ]
                let hasil = HaversineGeolocation.getDistanceBetween(points[0], points[1], 'm');
                console.log(hasil);
                if(hasil > 50){
                    this.setState({
                        status: 0,
                        status_location: "Berada di Luar Asrama",
                        text_color : "text-danger",
                    })
                }
                else{
                    this.setState({
                        status: 1,
                        status_location: "Berada di Asrama",
                        text_color : "text-success",
                    })
                }
            }))

            
        }
        else{
            alert('Browser anda tidak support')
        }
    }

    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
        console.log(name, value);
    }

    submitPresensi(e){
        
        e.preventDefault()
        console.log(this.state.lat)
        if(this.state.status === 10){
            alert('Silahkan Get Location Terlebih Dahulu')
        }
        else{
            this.setState({ isLoading: true });
            
            // console.log(this.state)
            api().post('api/presensi/create', ({
                status: this.state.status,
                latitude: this.state.lat,
                longitude: this.state.long,
                suhu_badan: this.state.suhu_badan,
                kondisi_kesehatan: this.state.kondisi_kesehatan,
                id_mhs: localStorage.getItem('user_id')
            })).then(response => {
                if(response.data.status === 'success'){
                    window.location.assign('/#/riwayat-presensi')
                }
                else{
                    this.setState({
                        errList: response.data.message
                    })
                }
            })

            // Set status animasi loading
            loadingAnimation().then(list => {
                this.setState({
                isLoading: false,
                list,
                });
            });
        }
        
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
                            <PageHeading title="Absensi Penghuni Asrama Polban" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h6 className="text-justify text-muted">
                                            <span className="text-danger">*</span> Untuk menjaga suasana Asrama Polban dan kampus Polban yang aman dan sehat, maka diminta kepada seluruh penghuni Asrama Polban untuk mengisi form ini setiap hari setiap pukul 7 pagi dan 7 petang.<br/><br/>
                                            <span className="text-danger">*</span> Apabila saudara tidak mengisi form ini, maka Polban akan menganggap bahwa saudara sedang sakit dan untuk itu akan kami rujuk untuk pulang ke orangtua atau ke rumah sakit.<br/><br/>
                                            <span className="text-danger">*</span> Bila suhu badan saudara mencapai 37,3 C, maka Polban akan membawa saudara ke klinik/rumah sakit. Mahasiswa yang sakit, akan di isolasi atau tidak di ijinkan untuk tinggal di Asrama Polban agar tidak menularkan ke temannya.</h6>
                                        <hr></hr>

                                        {/* Form presensi*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="time" className="col-md-3 col-form-label text-md-right">Waktu absensi</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        value={this.state.currentDateTime}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="coordinat" className="col-md-3 col-form-label text-md-right">Posisi saat ini</label>
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
                                                <label for="coordinat" className="col-md-3 col-form-label text-md-right">Kondisi kesehatan</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        name="kondisi_kesehatan"
                                                        placeholder="contoh: Sehat / Sakit"
                                                        onChange={this.handleFieldChange}
                                                        required
                                                    />
                                                    <small className="text-muted">Jelaskan keluhan saudara, jika merasa sakit.</small>
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.kondisi_kesehatan}</span>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="coordinat" className="col-md-3 col-form-label text-md-right">Suhu badan</label>
                                                <div className="col-md-8">
                                                    <div className="input-group">
                                                        <input
                                                            type="number"
                                                            name="suhu_badan"
                                                            className="form-control"
                                                            aria-describedby="temperature"
                                                            onChange={this.handleFieldChange}
                                                            value={this.state.suhu_badan}
                                                            required
                                                            step="0.1"
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" id="temperature">&deg;Celcius</span>
                                                        </div>
                                                    </div>
                                                    <small className="text-muted">Dapat dilakukan sendiri atau di pos keamanan pintu masuk 1 Polban.</small>
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.suhu_badan}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-2">
                                                    <button id="submit" onClick={this.submitPresensi} type='submit' className='btn btn-success' disabled={this.state.isLoading}>
                                                        {this.state.isLoading ? <i className="fas fa-spinner fa-pulse"></i> : <i className="fas fa-check"></i>} Submit
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