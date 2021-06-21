import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';
import api from '../../service/api';
import { updatePerizinan } from '../../service/perizinan';

class FormApprovalIzinPergi extends Component {
    constructor(props){
        super(props);
        this.state = {
            role: "",
            id_mhs: "",
            nama_mhs: "",
            tanggal_pergi: "",
            tanggal_pulang: "",
            keterangan_izin: "",
            status_izin: "",
            catatan_pengurus: "",
            surat_pendukung: "",
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

    handleSubmit(e){
        e.preventDefault()
        console.log(this.state)
        updatePerizinan({
            id: this.state.id,
            status_izin: this.state.status_izin,
            catatan_pengurus: this.state.catatan_pengurus
        })

    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
        const { id } = this.props.match.params

        api().get('api/perizinan/detail/' + id).then(response => {
            if(response.data.status === 'success'){
                this.setState({
                    id: id,
                    id_mhs: response.data.data.id_mhs,
                    nama_mhs: response.data.data.nama_mhs,
                    tanggal_pergi: response.data.data.tanggal_pergi,
                    tanggal_pulang: response.data.data.tanggal_pulang,
                    keterangan_izin: response.data.data.keterangan_izin,
                    status_izin: response.data.data.status_izin,
                    surat_pendukung: response.data.data.surat_pendukung,
                    catatan_pengurus: response.data.data.catatan_pengurus,
                })
                console.log(response.data.data.tanggal_pergi)
            }
            else{
                alert(response.data.msg)
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
                                        <h4 className="text-primary text-center">Formulir approval izin pergi asrama</h4>
                                        <h6 className="text-center text-muted">Isi data formulir approval perizinan dibawah ini</h6>
                                        <hr></hr>

                                        
                                        {/* Form presensi*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="name" className="col-md-3 col-form-label text-md-right">Nama</label>
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
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Keterangan</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        class="form-control-plaintext"
                                                        value={this.state.keterangan_izin}
                                                        disabled
                                                        rows="3">
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="startdate" className="col-md-3 col-form-label text-md-right">Mulai izin</label>
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
                                                <label for="enddate" className="col-md-3 col-form-label text-md-right">Berakhir pada</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled 
                                                        value={this.state.tanggal_pulang}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="formfile" className="col-md-3 col-form-label text-md-right">File pendukung</label>
                                                <div className="col-md-8">
                                                    <a href={'/storage/file_perizinan/' + this.state.surat_pendukung} download={this.state.surat_pendukung} class="btn btn-light btn-icon-split">
                                                        <span class="icon text-gray-600">
                                                            <i class="fas fa-file-download"></i>
                                                        </span>
                                                        <span class="text">Unduh file</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="statusApproval" className="col-md-3 col-form-label text-md-right">Status</label>
                                                <div className="col-md-8">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" onChange={this.handleFieldChange} type="radio" name="status_izin" id="setuju" value="1"/>
                                                        <label className="form-check-label" for="setuju">
                                                            Setuju
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" onChange={this.handleFieldChange} type="radio" name="status_izin" id="tolak" value="2"/>
                                                        <label className="form-check-label" for="tolak">
                                                            Tolak
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="note" className="col-md-3 col-form-label text-md-right">Catatan</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        className="form-control"
                                                        placeholder="(opsional)"
                                                        rows="3"
                                                        name="catatan_pengurus"
                                                        onChange={this.handleFieldChange}
                                                        value={this.state.catatan_pengurus}
                                                        >
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-2">
                                                    <button type="submit" onClick={this.handleSubmit} className="btn btn-success">
                                                        Submit
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

export default FormApprovalIzinPergi;