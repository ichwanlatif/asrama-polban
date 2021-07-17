import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

class FormApprovalIzinKembali extends Component {
    constructor(props){
        super(props);
        this.state = {
            role: "",
            //loading
            isLoading:false,
            list: [],
            errList: [],
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
        console.log(e.target)
    }

    async handleSubmit(e){
        this.setState({ isLoading: true });

        e.preventDefault()
        console.log(this.state)
        await api().put('api/perizinan/approval/kembali', ({
            id_mhs: this.state.id_mhs,
            id_perizinan: this.state.id_perizinan,
            status_izin: this.state.status_izin,
            pengajuan_tanggal_pulang: this.state.pengajuan_tanggal_pulang,
            catatan_approval: this.state.catatan_approval
        })).then(response => {
            if(response.data.status === 'success'){
                console.log(response.data.message)
                window.location.assign('/#/data-izin-kembali')
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

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
        const { id } = this.props.match.params

        if(localStorage.getItem("user_role") == 3){
            this.setState({
                setuju: 8,
                tolak: 9
            })
        }
        else if((localStorage.getItem("user_role") == 2)){
            this.setState({
                setuju: 6,
                tolak: 7
            })
        }

        api().get('api/perizinan/detail/' + id).then(response => {
            if(response.data.status === 'success'){
                this.setState({
                    id_perizinan: id,
                    id_mhs: response.data.data.id_mhs,
                    nama_mhs: response.data.data.nama_mhs,
                    no_hp_mhs: response.data.data.no_hp_mhs,
                    nama_gedung: response.data.data.nama_gedung,
                    no_kamar: response.data.data.no_kamar,
                    kondisi_kesehatan: response.data.data.kondisi_kesehatan,
                    suhu_badan: response.data.data.suhu_badan,
                    jenis_kendaraan: response.data.data.jenis_kendaraan,
                    keterangan_kembali: response.data.data.keterangan_kembali,
                    tanggal_pergi: response.data.data.tanggal_pergi,
                    pengajuan_tanggal_pulang: response.data.data.pengajuan_tanggal_pulang,
                    catatan_approval: response.data.data.catatan_approval,
                })
                console.log(response.data.data.tanggal_pergi)
            }
            else{
                alert(response.data.message)
            }
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
                            <PageHeading title="Approval Perizinan Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h6 className="text-justify text-muted">Isi data formulir approval perizinan dibawah ini</h6>
                                        <hr></hr>

                                        
                                        {/* Form presensi*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="name" className="col-md-3 col-form-label text-md-right">Nama mahasiswa</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled
                                                        value={this.state.nama_mhs}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="hp" className="col-md-3 col-form-label text-md-right">Nomor HP</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled
                                                        value={this.state.no_hp_mhs}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="building" className="col-md-3 col-form-label text-md-right">Gedung</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled
                                                        value={this.state.nama_gedung}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="room" className="col-md-3 col-form-label text-md-right">Nomor kamar</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled
                                                        value={this.state.no_kamar}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="healthy" className="col-md-3 col-form-label text-md-right">Kondisi kesehatan</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled
                                                        value={this.state.kondisi_kesehatan}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="temperature" className="col-md-3 col-form-label text-md-right">Suhu badan</label>
                                                <div className="col-md-3">
                                                    <div className="input-group">
                                                        <input 
                                                            type="text" 
                                                            className="form-control-plaintext"
                                                            disabled
                                                            value={this.state.suhu_badan}
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group" id="temperature">&deg;Celcius</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="vehicle" className="col-md-3 col-form-label text-md-right">Transportasi yang digunakan</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled
                                                        value={this.state.jenis_kendaraan}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Alasan kembali ke asrama</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        class="form-control-plaintext"
                                                        value={this.state.keterangan_kembali}
                                                        disabled
                                                        rows="3">
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="startdate" className="col-md-3 col-form-label text-md-right">Tanggal Pergi</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled 
                                                        value={this.state.tanggal_pergi}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="startdate" className="col-md-3 col-form-label text-md-right">Pengajuan Tanggal Kembali</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled 
                                                        value={this.state.pengajuan_tanggal_pulang}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="statusApproval" className="col-md-3 col-form-label text-md-right">Status</label>
                                                <div className="col-md-8">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" onChange={this.handleFieldChange} type="radio" name="status_izin" id="setuju" value={this.state.setuju}/>
                                                        <label className="form-check-label" for="setuju">
                                                            Setuju
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" onChange={this.handleFieldChange} type="radio" name="status_izin" id="tolak" value={this.state.tolak}/>
                                                        <label className="form-check-label" for="tolak">
                                                            Tolak
                                                        </label>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <span className="text-danger">*{this.state.errList.status_izin}</span>
                                            </div>
                                            <div className="form-group row">
                                                <label for="note" className="col-md-3 col-form-label text-md-right">Catatan persetujuan (opsional)</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        className="form-control"
                                                        rows="3"
                                                        name="catatan_approval"
                                                        onChange={this.handleFieldChange}
                                                        value={this.state.catatan_approval}
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-2">
                                                    <button type="submit" onClick={this.handleSubmit} className="btn btn-success" disabled={this.state.isLoading}>
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

export default FormApprovalIzinKembali;