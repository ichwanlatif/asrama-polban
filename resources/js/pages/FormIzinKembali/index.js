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

class FormIzinKembali extends Component {
    constructor(props){
        super(props);
        this.state = {
            role: "",
            suhu_badan: 36,
            jenis_kendaraan: "Sepeda",
            //loading
            isLoading:false,
            list: [],
            errList: [],
        };

        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        
        const { id } = this.props.match.params

        this.setState({
            role: localStorage.getItem("user_role"),
            id_perizinan: id
        });

        api().get('api/perizinan/detail/' + id).then(response => {
            if(response.data.status === 'success'){
                console.log(response.data.data)
                this.setState({
                    id_perizinan: id,
                    tanggal_pergi: response.data.data.tanggal_pergi,
                })
            }
            else{
                alert(response.data.message)
            }
        })
    }

    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    }

    async handleSubmit(e){
        e.preventDefault()
        console.log(this.state)

        if(document.getElementById('aggrement').checked == false){
            alert('Klik centang pada kotak')
        }
        else{
            this.setState({ isLoading: true });
            
            await api().put('api/perizinan/izinKembali', ({
                id_mhs: localStorage.getItem("user_id"),
                id_perizinan: this.state.id_perizinan,
                keterangan_kembali: this.state.keterangan_kembali,
                pengajuan_tanggal_pulang: this.state.pengajuan_tanggal_pulang,
                suhu_badan: this.state.suhu_badan,
                kondisi_kesehatan: this.state.kondisi_kesehatan,
                jenis_kendaraan: this.state.jenis_kendaraan
            })).then(response => {
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
                            <PageHeading title="Izin Kembali Ke Asrama" />

                            {/* Path */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/riwayat-perizinan">Riwayat Perizinan</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Formulir Izin Kembali</li>
                                </ol>
                            </nav>

                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">

                                        {/* Form izin kembali*/}
                                        <form>

                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Alasan kembali ke asrama</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        name="keterangan_kembali"
                                                        className="form-control"
                                                        placeholder="Beri penjelasan mengenai alasan kembali ke asrama"
                                                        rows="3"
                                                        onChange={this.handleFieldChange}
                                                        required>
                                                    </textarea>
                                                    <span className="text-danger">{this.state.errList.keterangan_kembali}</span>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="tanggal_pergi" className="col-md-3 col-form-label text-md-right">Mulai Izin</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                        name="tanggal_pergi"
                                                        value={this.state.tanggal_pergi}
                                                        readOnly="true"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="tanggal_pulang" className="col-md-3 col-form-label text-md-right">Mulai kembali</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                        name="pengajuan_tanggal_pulang"
                                                        onChange={this.handleFieldChange}
                                                        required
                                                    />
                                                    <span className="text-danger">{this.state.errList.pengajuan_tanggal_pulang}</span>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="coordinat" className="col-md-3 col-form-label text-md-right">Kondisi kesehatan</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text"
                                                        name="kondisi_kesehatan" 
                                                        className="form-control"
                                                        onChange={this.handleFieldChange}
                                                        placeholder="contoh: Sehat / Sakit"
                                                    />
                                                    <small className="text-muted">Jelaskan keluhan saudara, jika merasa sakit.</small>
                                                    <br></br><span className="text-danger">{this.state.errList.kondisi_kesehatan}</span>
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
                                                            value={this.state.suhu_badan}
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" id="temperature">&deg;Celcius</span>
                                                        </div>
                                                    </div>
                                                    <small className="text-muted">Dapat dilakukan sendiri atau di pos keamanan pintu masuk 1 Polban.</small>
                                                    <br></br><span className="text-danger">{this.state.errList.suhu_badan}</span>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Transportasi yang digunakan</label>
                                                <div className="col-md-8">
                                                    <select class="form-control" id="vehicle" name="jenis_kendaraan" onChange={this.handleFieldChange}>
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
                                                    <span className="text-danger">{this.state.errList.jenis_kendaraan}</span>
                                                </div>
                                            </div>

                                            <div className="form-group row my-4">
                                                <div className="col-md-12">
                                                    <label className="col-form-label text-justify"><span className="text-danger">*</span> Saya akan menanggung segala bentuk kerugian yang timbul dan tidak akan menuntut pihak Manajemen Polban. Demikian keterangan ini dibuat tanpa paksaan dan untuk dipergunakan sesuai dengan kepentingannya.</label>
                                                    <label className="col-form-label text-justify"><span className="text-danger">*</span>Silakan tunggu respon dari Kantor PD3. Saudara belum di ijinkan untuk memasuki Asrama sebelum ada surat ijin resmi dari Kantor PD3.</label>
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

export default FormIzinKembali;