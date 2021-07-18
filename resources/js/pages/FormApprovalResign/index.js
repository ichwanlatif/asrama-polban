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

class FormApprovalResign extends Component {
    constructor(props){
        super(props);
        this.state = {
            role: "",
            id_mhs: "",
            nama_mhs: "",

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
        
        await api().put('api/resign/approval', ({
            id_resign: this.state.id,
            status_resign: this.state.status_resign
        })).then(response => {
            if(response.data.status === 'success'){
                console.log(response.data.message)
                window.location.assign('/#/data-resign')
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

        if(localStorage.getItem("user_role") == 3){
            this.setState({
                setuju: 3,
                tolak: 4
            })
        }
        else if((localStorage.getItem("user_role") == 2)){
            this.setState({
                setuju: 1,
                tolak: 2
            })
        }

        const { id } = this.props.match.params

        api().get('api/resign/detail/' + id).then(response => {
            if(response.data.status === 'success'){
                this.setState({
                    id: id,
                    id_mhs: response.data.data.id_mhs,
                    nama_mhs: response.data.data.nama_mhs,
                    nim: response.data.data.nim,
                    prodi: response.data.data.nama_prodi,
                    jurusan: response.data.data.nama_jurusan,
                    gedung: response.data.data.nama_gedung,
                    kamar: response.data.data.no_kamar,
                    kondisi_kesehatan: response.data.data.kondisi_kesehatan,
                    suhu_badan: response.data.data.suhu_badan,
                    nama_ortu: response.data.data.nama_ortu,
                    alamat: response.data.data.alamat,
                    jenis_kendaraan: response.data.data.jenis_kendaraan,
                    keterangan_resign: response.data.data.keterangan_resign,
                    tanggal_resign: response.data.data.tanggal_resign,
                    keterangan_stnk: response.data.data.keterangan_stnk
                })
            }
            else{
                alert(response.data.message)
            }


        })
    }

    render() {
        let hidden;
        if(this.state.keterangan_stnk == null){
            hidden = true;
        }
        else{
            hidden = false;
        }
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
                            <PageHeading title="Approval Resign Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h6 className="text-justify text-muted">Isi data formulir approval resign dibawah ini</h6>
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
                                                <label for="nim" className="col-md-3 col-form-label text-md-right">Nomor Induk Mahasiswa</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        value={this.state.nim}
                                                        className="form-control-plaintext"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="prodi" className="col-md-3 col-form-label text-md-right">Prodi</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text"
                                                        value={this.state.prodi} 
                                                        className="form-control-plaintext"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="jurusan" className="col-md-3 col-form-label text-md-right">Jurusan</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        value={this.state.jurusan}
                                                        className="form-control-plaintext"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="building" className="col-md-3 col-form-label text-md-right">Gedung</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        value={this.state.gedung}
                                                        className="form-control-plaintext"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="room" className="col-md-3 col-form-label text-md-right">Nomor kamar</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        value={this.state.kamar}
                                                        className="form-control-plaintext"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="healthy" className="col-md-3 col-form-label text-md-right">Kondisi kesehatan</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        value={this.state.kondisi_kesehatan}
                                                        className="form-control-plaintext"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="temperature" className="col-md-3 col-form-label text-md-right">Suhu badan</label>
                                                <div className="col-md-3">
                                                    <div className="input-group">
                                                        <input 
                                                            type="text" 
                                                            value={this.state.suhu_badan}
                                                            className="form-control-plaintext"
                                                            disabled
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group" id="temperature">&deg;Celcius</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="ortu" className="col-md-3 col-form-label text-md-right">Nama orang tua</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        value={this.state.nama_ortu}
                                                        className="form-control-plaintext"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="address" className="col-md-3 col-form-label text-md-right">Alamat orang tua</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        value={this.state.alamat}
                                                        className="form-control-plaintext"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="vehicle" className="col-md-3 col-form-label text-md-right">Kendaraan yang dibawa</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        value={this.state.jenis_kendaraan}
                                                        className="form-control-plaintext"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="formfile" className="col-md-3 col-form-label text-md-right">STNK</label>
                                                <div className="col-md-8">
                                                    <a href={'/storage/stnk_kendaraan/' + this.state.keterangan_stnk} download={this.state.surat_pendukung} class="btn btn-light btn-icon-split" hidden={hidden} >
                                                        <span class="icon text-gray-600">
                                                            <i class="fas fa-file-download"></i>
                                                        </span>
                                                        <span class="text">Unduh file</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Alasan resign Asrama Polban</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        class="form-control-plaintext"
                                                        value={this.state.keterangan_resign}
                                                        disabled
                                                        rows="3">
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="startdate" className="col-md-3 col-form-label text-md-right">Mulai resign</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        disabled 
                                                        value={this.state.tanggal_resign}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="statusApproval" className="col-md-3 col-form-label text-md-right">Status</label>
                                                <div className="col-md-8">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" onChange={this.handleFieldChange} type="radio" name="status_resign" id="setuju" value={this.state.setuju} />
                                                        <label className="form-check-label" for="setuju">
                                                            Setuju
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" onChange={this.handleFieldChange} type="radio" name="status_resign" id="tolak" value={this.state.tolak} />
                                                        <label className="form-check-label" for="tolak">
                                                            Tolak
                                                        </label>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <span className="text-danger">*{this.state.errList.status_resign}</span>
                                            </div>
                                            <div className="form-group row">
                                                <label for="note" className="col-md-3 col-form-label text-md-right">Catatan persetujuan (opsional)</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        className="form-control"
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

export default FormApprovalResign;