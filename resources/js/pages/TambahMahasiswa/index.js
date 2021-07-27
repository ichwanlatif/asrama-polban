import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

import api from '../../service/api';

class TambahMahasiswa extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            dataProdi: [],
            dataKamar: [],
        };
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });

        api().get('api/prodi').then(responseProdi =>{
            if(responseProdi.data.status === 'success'){
                this.setState({
                    dataProdi: responseProdi.data.data
                })
                console.log(this.state.dataProdi)
            }
            else{
                alert(responseProdi.data.message);
            }
        })

        api().get('api/kamar').then(responseKamar =>{
            if(responseKamar.data.status === 'success'){
                this.setState({
                    dataKamar: responseKamar.data.data
                })
                console.log(this.state.dataKamar)
            }
            else{
                alert(responseKamar.data.message);
            }
        })
    }

    render() {
        const dataProdi = this.state.dataProdi;
        const dataKamar = this.state.dataKamar;

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
                                        <h6 className="text-muted">Isi data mahasiswa dibawah ini</h6>
                                        <hr></hr>

                                        {/* Tambah mahasiswa*/}
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
                                                <label for="nama" className="col-md-3 col-form-label text-md-right">Nama lengkap</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="Masukan nama mahasiswa"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="alamat" className="col-md-3 col-form-label text-md-right">Alamat</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="Masukan alamat saat ini"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="jenis_kelamin" className="col-md-3 col-form-label text-md-right">Jenis kelamin</label>
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
                                                <label for="agama" className="col-md-3 col-form-label text-md-right">Agama</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="agama" name="agama">
                                                        <option value="Islam">Islam</option>
                                                        <option value="Kristen">Kristen</option>
                                                        <option value="Katolik">Katolik</option>
                                                        <option value="Hindu">Hindu</option>
                                                        <option value="Budha">Budha</option>
                                                        <option value="Konghucu">Konghucu</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="tanggal_lahir" className="col-md-3 col-form-label text-md-right">Tanggal lahir</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="no_hp_mhs" className="col-md-3 col-form-label text-md-right">Nomor hp</label>
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
                                                <label for="nama_ortu" className="col-md-3 col-form-label text-md-right">Nama orangtua / wali</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="Masukan nama orangtua / wali mahasiswa"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="no_hp_ortu" className="col-md-3 col-form-label text-md-right">Nomor hp orangtua / wali</label>
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
                                                <label for="id_prodi" className="col-md-3 col-form-label text-md-right">Jurusan / Program studi</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="id_prodi" name="id_prodi">
                                                        {dataProdi.map(prodi => {
                                                        const {
                                                            id_prodi,
                                                            nama_prodi,
                                                            nama_jurusan,
                                                        } = prodi;
                                                        return (
                                                            <option value={prodi.id_prodi}>{prodi.nama_jurusan} / {prodi.nama_prodi}</option>
                                                        )
                                                    })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="keterangan_asal" className="col-md-3 col-form-label text-md-right">keterangan asal</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="keterangan_asal" name="keterangan_asal">
                                                        <option value="ADIK">ADIK</option>
                                                        <option value="Bidikmisi">Bidikmisi</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="id_kamar" className="col-md-3 col-form-label text-md-right">Kamar asrama</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="id_kamar" name="id_kamar">
                                                        {dataKamar.map(kamar => {
                                                        const {
                                                            id_kamar,
                                                            no_kamar,
                                                            nama_gedung,
                                                        } = kamar;
                                                        return (
                                                            <option value={kamar.id_kamar}>{kamar.nama_gedung} - {kamar.no_kamar}</option>
                                                        )
                                                    })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="role_mhs" className="col-md-3 col-form-label text-md-right">Jabatan</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="role_mhs" name="role_mhs">
                                                        <option value="Mahasiswa">Mahasiswa</option>
                                                        <option value="Pengurus">Pengurus</option>
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