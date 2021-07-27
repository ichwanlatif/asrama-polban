import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';
import api from '../../service/api';

function loadingAnimation() {
    return new Promise(function(resolve) {
      setTimeout(() => resolve([1, 2, 3]), 1000);
    });
}

class FormResign extends Component {
    constructor(props){
        super(props);
        this.state = {
            role: "",
            id_mhs: localStorage.getItem('user_id'),
            suhu_badan: 36,
            jenis_kendaraan: "Sepeda",
            file: "",

            //loading
            isLoading:false,
            list: [],
            errList: [],
        };

        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
    }

    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    }

    handleFileChange(e){
        let files = e.target.files[0];
        this.setState({
            file: files
        })
    }

    async handleSubmit(e){
        this.setState({ isLoading: true });

        e.preventDefault()

        const data = new FormData()

        data.append('id_mhs', this.state.id_mhs)

        if(this.state.tanggal_resign != undefined){
            data.append('tanggal_resign', this.state.tanggal_resign)
        }

        if(this.state.jenis_kendaraan != undefined){
            data.append('jenis_kendaraan', this.state.jenis_kendaraan)
        }

        if(this.state.keterangan_resign != undefined){
            data.append('keterangan_resign', this.state.keterangan_resign)
        }

        if(this.state.kondisi_kesehatan != undefined){
            data.append('kondisi_kesehatan', this.state.kondisi_kesehatan)
        }

        if(this.state.suhu_badan != undefined){
            data.append('suhu_badan', this.state.suhu_badan)
        }

        await api().post('api/resign/create', data).then(response => {
            if(response.data.status === 'success'){
                console.log(response.data.message)
                window.location.assign('/#/riwayat-perizinan')
            }
            else{
                if(response.data.status == 'invalid'){
                    alert(response.data.message)
                }
                else{
                    this.setState({
                        errList: response.data.message
                    })
                }
            }
        })
        
        
        // console.warn(this.state.file);

        console.log(this.state);

        // Set status animasi loading
        loadingAnimation().then(list => {
            this.setState({
            isLoading: false,
            list,
            });
        });
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
                            <PageHeading title="Resign Asrama Polban" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">

                                        {/* Form resign*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Alasan resign Asrama Polban</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="contoh: Masa tinggal habis"
                                                        name="keterangan_resign"
                                                        onChange={this.handleFieldChange}
                                                    />
                                                    <span className="text-danger">*{this.state.errList.keterangan_resign}</span>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="tanggal_resign" className="col-md-3 col-form-label text-md-right">Mulai resign</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                        name="tanggal_resign"
                                                        onChange={this.handleFieldChange}
                                                        required
                                                    />
                                                    <span className="text-danger">*{this.state.errList.tanggal_resign}</span>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="coordinat" className="col-md-3 col-form-label text-md-right">Kondisi kesehatan</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="contoh: Sehat / Sakit"
                                                        name="kondisi_kesehatan"
                                                        onChange={this.handleFieldChange}
                                                    />
                                                    <small className="text-muted">Jelaskan keluhan saudara, jika merasa sakit.</small>
                                                    <br></br><span className="text-danger">*{this.state.errList.kondisi_kesehatan}</span>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="coordinat" className="col-md-3 col-form-label text-md-right">Suhu badan</label>
                                                <div className="col-md-8">
                                                    <div className="input-group">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            aria-describedby="temperature"
                                                            name="suhu_badan"
                                                            step="0.1"
                                                            onChange={this.handleFieldChange}
                                                            value={this.state.suhu_badan}
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" id="temperature">&deg;Celcius</span>
                                                        </div>
                                                    </div>
                                                    <small className="text-muted">Dapat dilakukan sendiri atau di pos keamanan pintu masuk 1 Polban.</small>
                                                    <br></br><span className="text-danger">*{this.state.errList.suhu_badan}</span>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Kendaraan yang dibawa</label>
                                                <div className="col-md-8">
                                                    <select class="form-control" id="vehicle" name="jenis_kendaraan" onChange={this.handleFieldChange}>
                                                        <option selected >Sepeda</option>
                                                        <option>Motor</option>
                                                        <option>Mobil</option>
                                                        <option>Tidak ada</option>
                                                    </select>
                                                    <span className="text-danger">*{this.state.errList.jenis_kendaraan}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <label for="formfile" className="col-md-3 col-form-label text-md-right">STNK (opsional)</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        className="form-control-file" 
                                                        type="file"
                                                        onChange={this.handleFileChange}
                                                    />
                                                    <small className="text-muted">Format yang didukung: *.jpg, *.png, *.pdf</small>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-2">
                                                    <button type="submit" className="btn btn-success" onClick={this.handleSubmit} disabled={this.state.isLoading}>
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

export default FormResign;