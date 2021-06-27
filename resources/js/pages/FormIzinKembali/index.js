import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';
import { createResign } from '../../service/resign';

class FormIzinKembali extends Component {
    constructor(props){
        super(props);
        this.state = {
            role: "",
        };

        this.handleFieldChange = this.handleFieldChange.bind(this)
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

    handleSubmit(e){
        e.preventDefault()
        console.log(this.state)
        createResign({
            id_mhs: localStorage.getItem('user_id'),
            tanggal_resign: this.state.tanggal_resign,
            keterangan_resign: this.state.keterangan_resign
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
                            <PageHeading title="Izin Kembali Ke Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h6 className="text-justify text-muted">
                                            <span className="text-danger">*</span> Penghuni Asrama Mahasiswa Polban yang mau kembali masuk ke asrama diharuskan untuk mengisi formulir ini.<br/><br/>
                                            <span className="text-danger">*</span> Silakan tunggu konfirmasi dari kantor PD3.
                                        </h6>
                                        <hr></hr>

                                        {/* Form izin kembali*/}
                                        <form>

                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Alasan kembali ke asrama</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        name="keterangan_izin"
                                                        className="form-control"
                                                        placeholder="Beri penjelasan mengenai alasan kembali ke asrama"
                                                        rows="3"
                                                        onChange={this.handleFieldChange}
                                                        required>
                                                    </textarea>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="tanggal_resign" className="col-md-3 col-form-label text-md-right">Mulai kembali</label>
                                                <div className="col-md-3">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                        name="tanggal_resign"
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
                                                            className="form-control"
                                                            aria-describedby="temperature"
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
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Transportasi yang digunakan</label>
                                                <div className="col-md-8">
                                                    <select class="form-control" id="vehicle">
                                                        <option>Sepeda</option>
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
                                                    <small className="text-muted">Silakan tunggu respon dari Kantor PD3. Saudara belum di ijinkan untuk memasuki Asrama sebelum ada surat ijin resmi dari Kantor PD3.</small>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="aggrement" required/>
                                                        <label class="custom-control-label" for="aggrement">Saya memahami dan setuju</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-2">
                                                    <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>
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

export default FormIzinKembali;