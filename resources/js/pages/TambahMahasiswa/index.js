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

class TambahMahasiswa extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            dataProdi: [],
            dataKamar: [],
            errList: [],

            //loading
            isLoading:false,
            list: [],

            //form
            agama:"Islam",
            id_prodi: 1,
            keterangan_asal:"ADIK",
            id_kamar:1,
            role_mhs:"Mahasiswa",
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    }

    async handleSubmit(e){
        this.setState({ isLoading: true });

        e.preventDefault();
        await api().post('api/mahasiswa/store', ({
            email: this.state.email,
            id_prodi: this.state.id_prodi,
            id_kamar: this.state.id_kamar,
            nama_mhs: this.state.nama_mhs,
            nim: this.state.nim,
            alamat: this.state.alamat,
            no_hp_mhs: this.state.no_hp_mhs,
            nama_ortu: this.state.nama_ortu,
            no_hp_ortu: this.state.no_hp_ortu,
            jenis_kelamin: this.state.jenis_kelamin,
            status_keaktifan: 1,
            tanggal_lahir: this.state.tanggal_lahir,
            agama: this.state.agama,
            keterangan_asal: this.state.keterangan_asal,
            role_mhs: this.state.role_mhs
        })).then(response => {
            if(response.data.status == 'success'){
                window.location.assign('/#/data-mahasiswa')
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

        api().get('api/prodi').then(responseProdi =>{
            if(responseProdi.data.status == 'success'){
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
            if(responseKamar.data.status == 'success'){
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

                            {/* Path */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/data-mahasiswa">Data Mahasiswa</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Tambah Mahasiswa</li>
                                </ol>
                            </nav>

                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">

                                        {/* Tambah mahasiswa*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="email" className="col-md-3 col-form-label text-md-right">Email</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="email"
                                                        name="email"
                                                        onChange={this.handleFieldChange} 
                                                        className="form-control"
                                                        placeholder="Masukan email polban"
                                                    />
                                                    <span className="text-danger">{this.state.errList.email}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="nama" className="col-md-3 col-form-label text-md-right">Nama lengkap</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        name="nama_mhs"
                                                        onChange={this.handleFieldChange}
                                                        className="form-control"
                                                        placeholder="Masukan nama mahasiswa"
                                                    />
                                                    <span className="text-danger">{this.state.errList.nama_mhs}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="alamat" className="col-md-3 col-form-label text-md-right">Alamat</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text"
                                                        name="alamat"
                                                        onChange={this.handleFieldChange} 
                                                        className="form-control"
                                                        placeholder="Masukan alamat saat ini"
                                                    />
                                                    <span className="text-danger">{this.state.errList.alamat}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="jenis_kelamin" className="col-md-3 col-form-label text-md-right">Jenis kelamin</label>
                                                <div className="col-md-8">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="jenis_kelamin" id="laki-laki" value="1" onChange={this.handleFieldChange} />
                                                        <label className="form-check-label" for="laki-laki">
                                                            Laki-laki
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="jenis_kelamin" id="perempuan" value="0" onChange={this.handleFieldChange}/>
                                                        <label className="form-check-label" for="perempuan">
                                                            Perempuan
                                                        </label>
                                                    </div>
                                                    <br></br>
                                                    <span className="text-danger">{this.state.errList.jenis_kelamin}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="agama" className="col-md-3 col-form-label text-md-right">Agama</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="agama" name="agama" onChange={this.handleFieldChange}>
                                                        <option value="Islam">Islam</option>
                                                        <option value="Kristen">Kristen</option>
                                                        <option value="Katolik">Katolik</option>
                                                        <option value="Hindu">Hindu</option>
                                                        <option value="Budha">Budha</option>
                                                        <option value="Konghucu">Konghucu</option>
                                                    </select>
                                                    <span className="text-danger">{this.state.errList.agama}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="tanggal_lahir" className="col-md-3 col-form-label text-md-right">Tanggal lahir</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="date"
                                                        name="tanggal_lahir"
                                                        onChange={this.handleFieldChange} 
                                                        className="form-control"
                                                    />
                                                    <span className="text-danger">{this.state.errList.tanggal_lahir}</span>
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
                                                            name="no_hp_mhs"
                                                            onChange={this.handleFieldChange}
                                                            className="form-control"
                                                            min="1"
                                                            placeholder="8xx.."
                                                        />
                                                    </div>
                                                    <span className="text-danger">{this.state.errList.no_hp_mhs}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="nama_ortu" className="col-md-3 col-form-label text-md-right">Nama orangtua / wali</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        name="nama_ortu"
                                                        onChange={this.handleFieldChange}
                                                        placeholder="Masukan nama orangtua / wali mahasiswa"
                                                    />
                                                    <span className="text-danger">{this.state.errList.nama_ortu}</span>
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
                                                            name="no_hp_ortu"
                                                            onChange={this.handleFieldChange}
                                                            className="form-control"
                                                            min="1"
                                                            placeholder="8xx.."
                                                        />
                                                    </div>
                                                    <span className="text-danger">{this.state.errList.no_hp_ortu}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="nim" className="col-md-3 col-form-label text-md-right">NIM</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text"
                                                        name="nim"
                                                        onChange={this.handleFieldChange} 
                                                        className="form-control"
                                                        placeholder="Masukan Nomor induk mahasiswa"
                                                    />
                                                    <span className="text-danger">{this.state.errList.nim}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="id_prodi" className="col-md-3 col-form-label text-md-right">Jurusan / Program studi</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="id_prodi" name="id_prodi" onChange={this.handleFieldChange}>
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
                                                    <br></br>
                                                    <span className="text-danger">{this.state.errList.id_prodi}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="keterangan_asal" className="col-md-3 col-form-label text-md-right">Keterangan asal</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="keterangan_asal" name="keterangan_asal" onChange={this.handleFieldChange}>
                                                        <option value="ADIK">ADIK</option>
                                                        <option value="KIP Kuliah">KIP Kuliah</option>
                                                        <option value="Program Kerja sama">Program Kerja sama</option>
                                                    </select>
                                                    <br></br>
                                                    <span className="text-danger">{this.state.errList.keterangan_asal}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="id_kamar" className="col-md-3 col-form-label text-md-right">Kamar asrama</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="id_kamar" name="id_kamar" onChange={this.handleFieldChange}>
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
                                                    <br></br>
                                                    <span className="text-danger">{this.state.errList.id_kamar}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="role_mhs" className="col-md-3 col-form-label text-md-right">Peran</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="role_mhs" name="role_mhs" onChange={this.handleFieldChange}>
                                                        <option value="Mahasiswa">Mahasiswa</option>
                                                        <option value="Pengurus">Pengurus</option>
                                                    </select>
                                                    <br></br>
                                                    <span className="text-danger">{this.state.errList.role_mhs}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-2">
                                                    <button type="submit" className="btn btn-success" onClick={this.handleSubmit} disabled={this.state.isLoading}>
                                                        {this.state.isLoading ? <i className="fas fa-spinner fa-pulse"></i> : <i className="fas fa-sign-in-alt"></i>} Submit
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