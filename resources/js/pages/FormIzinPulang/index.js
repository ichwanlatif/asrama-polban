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

class FormIzinPulang extends Component {
    constructor(){
        super();
        this.state = {
            id_mhs: localStorage.getItem('user_id'),
            suhu_badan: 36,
            jenis_kendaraan: "sepeda",
            file: null,

            //loading
            isLoading:false,
            list: [],

            errList: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        e.preventDefault()

        if(document.getElementById('aggrement').checked == false){
            alert('Klik centang pada box');

        }
        else{
            this.setState({ isLoading: true });

            const data = new FormData()
            data.append('file', this.state.file)
            data.append('id_mhs', this.state.id_mhs)
            data.append('tanggal_pergi', this.state.tanggal_pergi)
            data.append('tanggal_pulang', this.state.tanggal_pulang)
            data.append('jenis_kendaraan', this.state.jenis_kendaraan)
            data.append('keterangan_izin', this.state.keterangan_izin)
            data.append('kondisi_kesehatan', this.state.kondisi_kesehatan)
            data.append('suhu_badan', this.state.suhu_badan)
            data.append('alamat_izin', this.state.alamat_izin)
            
            // console.warn(this.state.file);

            console.log(this.state);

            await api().post('api/perizinan/create', data).then(response => {
                if(response.data.status === 'success'){
                    console.log(response.data.msg)
                    window.location.assign('/#/riwayat-perizinan')
                }
                else{
                    alert(response.data.message)
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

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
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
                            <PageHeading title="Izin Meninggalkan Asrama Polban" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h6 className="text-justify text-muted">
                                            <span className="text-danger">*</span> Penghuni Asrama Mahasiswa Polban yang ingin pergi diharuskan untuk mengisi formulir ini.<br/><br/>
                                            <span className="text-danger">*</span> Silakan tunggu konfirmasi dari kantor PD3.
                                        </h6>
                                        <hr></hr>

                                        {/* Form perizinan*/}
                                        <form>

                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Alasan meninggalkan asrama</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        name="keterangan_izin"
                                                        className="form-control"
                                                        placeholder="Beri penjelasan mengenai alasan pergi dari asrama"
                                                        rows="3"
                                                        onChange={this.handleFieldChange}
                                                        required>
                                                    </textarea>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="tanggal_pergi" className="col-md-3 col-form-label text-md-right">Tanggal pergi</label>
                                                <div className="col-md-3">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                        name="tanggal_pergi"
                                                        onChange={this.handleFieldChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="tanggal_pulang" className="col-md-3 col-form-label text-md-right">Tanggal pulang</label>
                                                <div className="col-md-3">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                        name="tanggal_pulang"
                                                        onChange={this.handleFieldChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="coordinat" className="col-md-3 col-form-label text-md-right">Kondisi kesehatan</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text"
                                                        name="kondisi_kesehatan"
                                                        onChange={this.handleFieldChange} 
                                                        className="form-control"
                                                        placeholder="contoh: Sehat / Sakit"
                                                    />
                                                    <small className="text-muted">Jelaskan keluhan saudara, jika merasa sakit.</small>
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
                                                            onChange={this.handleFieldChange}
                                                            aria-describedby="temperature"
                                                            value={this.state.suhu_badan}
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" id="temperature">&deg;Celcius</span>
                                                        </div>
                                                    </div>
                                                    <small className="text-muted">Dapat dilakukan sendiri atau di pos keamanan pintu masuk 1 Polban.</small>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="formfile" className="col-md-3 col-form-label text-md-right">Surat pendukung (opsional)</label>
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
                                                <label for="address" className="col-md-3 col-form-label text-md-right">Alamat tujuan pergi</label>
                                                <div className="col-md-8">
                                                    <input type="text" name="alamat_izin" onChange={this.handleFieldChange} className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Transportasi yang digunakan</label>
                                                <div className="col-md-8">
                                                    <select class="form-control" onChange={this.handleFieldChange} name="jenis_kendaraan" id="vehicle">
                                                        <option selected >Sepeda</option>
                                                        <option>Motor</option>
                                                        <option>Mobil</option>
                                                        <option>Angkutan Kota</option>
                                                        <option>Travel</option>
                                                        <option>Bus Antar Kota</option>
                                                        <option>Pesawat</option>
                                                        <option>Kereta Api</option>
                                                        <option>Kapal Laut</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group row my-4">
                                                <div className="col-md-11">
                                                    <label className="col-form-label text-justify"><span className="text-danger">*</span> Saya akan menanggung segala bentuk kerugian yang timbul dan tidak akan menuntut pihak Manajemen Polban. Demikian keterangan ini dibuat tanpa paksaan dan untuk dipergunakan sesuai dengan kepentingannya.</label>
                                                    <small className="text-muted">Silakan tunggu respon dari Kantor PD3. Saudara belum di ijinkan untuk meninggalkan Asrama sebelum ada surat ijin resmi dari Kantor PD3.</small>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="aggrement" required/>
                                                        <label class="custom-control-label" for="aggrement">Saya memahami dan setuju</label>
                                                    </div>
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

export default FormIzinPulang;