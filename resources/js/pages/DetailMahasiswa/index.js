import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

class DetailMahasiswa extends Component {
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
                            <PageHeading title="Detail Mahasiswa" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h4 className="text-primary text-center">Detail Mahasiswa</h4>
                                        <hr></hr>

                                        {/* Data mahasiswa*/}
                                        <div className="form-group row">
                                            <label for="email" className="col-md-3 col-form-label text-md-right">Email</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="rizqa.fauzziyah.tif18@polban.ac.id"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="password" className="col-md-3 col-form-label text-md-right">Password</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="password" 
                                                    className="form-control-plaintext"
                                                    value="123456"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="name" className="col-md-3 col-form-label text-md-right">Nama</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="Rizqa Nabila"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="nim" className="col-md-3 col-form-label text-md-right">NIM</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="181511065"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="prodi" className="col-md-3 col-form-label text-md-right">Prodi</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="D-3 Teknik Informatika"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="jurusan" className="col-md-3 col-form-label text-md-right">Jurusan</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="Teknik Komputer dan Informatika"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="gender" className="col-md-3 col-form-label text-md-right">Jenis kelamin</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="Perempuan"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="birth" className="col-md-3 col-form-label text-md-right">Tanggal lahir</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="1 Januari 2000"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="region" className="col-md-3 col-form-label text-md-right">Agama</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="Islam"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="address" className="col-md-3 col-form-label text-md-right">Alamat</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="Jl.Carijodoh no.125, Tasikmalaya"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="hp" className="col-md-3 col-form-label text-md-right">Nomor hp</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="08991276549"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="namaortu" className="col-md-3 col-form-label text-md-right">Nama orangtua</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="Bu Rizqa"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="hportu" className="col-md-3 col-form-label text-md-right">Nomor hp orangtua</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="08991276549"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="ukt" className="col-md-3 col-form-label text-md-right">Golongan UKT</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="1"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="kamar" className="col-md-3 col-form-label text-md-right">Kamar</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="A2"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="jabatan" className="col-md-3 col-form-label text-md-right">Jabatan</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="Mahasiswa"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="active" className="col-md-3 col-form-label text-md-right">Status keaktifan</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value="Aktif"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-8 offset-md-3 mb-2">
                                                <Link to="/edit-mahasiswa" className="btn btn-success">Sunting</Link>
                                            </div>
                                        </div>
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

export default DetailMahasiswa;