import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

class TambahMahasiswa extends Component {
    constructor(){
        super();
        this.state = {
            role: ""
        };
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
                            <PageHeading title="Tambah Mahasiswa" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h4 className="text-primary text-center">Tambah Mahasiswa</h4>
                                        <h6 className="text-center text-muted">Isi data mahasiswa dibawah ini</h6>
                                        <hr></hr>

                                        {/* Edit mahasiswa*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="email" className="col-md-3 col-form-label text-md-right">Email</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="email" 
                                                        className="form-control"
                                                        placeholder="Masukan email polban"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="name" className="col-md-3 col-form-label text-md-right">Nama lengkap</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="Masukan nama mahasiswa"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="nim" className="col-md-3 col-form-label text-md-right">NIM</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="Masukan Nomor induk mahasiswa"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="prodijurusan" className="col-md-3 col-form-label text-md-right">Prodi / Jurusan</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="prodijurusan" name="prodijurusan">
                                                        <option value="1">D-3 Teknik Informatika / Teknik Komputer dan Informatika</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="gender" className="col-md-3 col-form-label text-md-right">Jenis kelamin</label>
                                                <div className="col-md-8">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="status" id="laki-laki" value="laki-laki"/>
                                                        <label className="form-check-label" for="laki-laki">
                                                            Laki-laki
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="status" id="perempuan" value="perempuan"/>
                                                        <label className="form-check-label" for="perempuan">
                                                            Perempuan
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="birth" className="col-md-3 col-form-label text-md-right">Tanggal lahir</label>
                                                <div className="col-md-3">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="region" className="col-md-3 col-form-label text-md-right">Agama</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="Masukan agama"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="address" className="col-md-3 col-form-label text-md-right">Alamat</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="Masukan alamat"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="hp" className="col-md-3 col-form-label text-md-right">Nomor hp</label>
                                                <div className="col-md-8">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">+62 </div>
                                                        </div>
                                                        <input 
                                                            type="number" 
                                                            className="form-control"
                                                            min="1"
                                                            placeholder="8xx.."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="namaortu" className="col-md-3 col-form-label text-md-right">Nama orangtua / wali</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="Masukan nama orangtua / wali mahasiswa"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="hportu" className="col-md-3 col-form-label text-md-right">Nomor hp orangtua / wali</label>
                                                <div className="col-md-8">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">+62 </div>
                                                        </div>
                                                        <input 
                                                            type="number" 
                                                            className="form-control"
                                                            min="1"
                                                            placeholder="8xx.."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="ukt" className="col-md-3 col-form-label text-md-right">Golongan UKT</label>
                                                <div className="col-md-1">
                                                    <input 
                                                        type="number" 
                                                        className="form-control"
                                                        min="1" max="8"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="kamar" className="col-md-3 col-form-label text-md-right">Kamar</label>
                                                <div className="col-md-2">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="jabatan" className="col-md-3 col-form-label text-md-right">Jabatan</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="jabatan" name="jabatan">
                                                        <option value="1">Mahasiswa</option>
                                                        <option value="2">Pengurus Koordinator</option>
                                                        <option value="3">Pengurus Komisi disiplin</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-2">
                                                    <button type="submit" className="btn btn-success">
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

export default TambahMahasiswa;