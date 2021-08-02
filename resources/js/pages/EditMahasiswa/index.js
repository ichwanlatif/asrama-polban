import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

import api from '../../service/api';
import { stubString } from 'lodash';

class EditMahasiswa extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            password: "",
            dataProdi: [],
            dataKamar: [],
            errList: [],
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
        e.preventDefault();
        const {id} = this.props.match.params
        console.log(this.state)
        await api().put('api/mahasiswa/update', ({
            id_mhs: id,
            email: this.state.email,
            password: this.state.password,
            id_prodi: this.state.id_prodi,
            id_kamar: this.state.id_kamar,
            id_users: this.state.id_users,
            nama_mhs: this.state.nama_mhs,
            nim: this.state.nim,
            alamat: this.state.alamat,
            no_hp_mhs: this.state.no_hp_mhs,
            nama_ortu: this.state.nama_ortu,
            no_hp_ortu: this.state.no_hp_ortu,
            jenis_kelamin: this.state.jenis_kelamin,
            status_keaktifan: this.state.status_keaktifan,
            tanggal_lahir: this.state.tanggal_lahir,
            agama: this.state.agama,
            keterangan_asal: this.state.keterangan_asal,
            role_mhs: this.state.role_mhs
        })).then(response => {
            if(response.data.status === 'success'){
                window.location.assign('/#/data-mahasiswa')
            }
            else{
                this.setState({
                    errList: response.data.message
                })
            }
        })
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
        const {id} = this.props.match.params
        api().get('api/mahasiswa/' + id).then(responseMahasiswa =>{
            if(responseMahasiswa.data.status === 'success'){
                this.setState({
                    email: responseMahasiswa.data.data.email,
                    id_prodi: responseMahasiswa.data.data.id_prodi,
                    id_users: responseMahasiswa.data.data.id_users,
                    id_kamar: responseMahasiswa.data.data.id_kamar,
                    nama_mhs: responseMahasiswa.data.data.nama_mhs,
                    nim: responseMahasiswa.data.data.nim,
                    alamat: responseMahasiswa.data.data.alamat,
                    no_hp_mhs: responseMahasiswa.data.data.no_hp_mhs,
                    nama_ortu: responseMahasiswa.data.data.nama_ortu,
                    no_hp_ortu: responseMahasiswa.data.data.no_hp_ortu,
                    jenis_kelamin: responseMahasiswa.data.data.jenis_kelamin,
                    status_keaktifan: responseMahasiswa.data.data.status_keaktifan,
                    tanggal_lahir: responseMahasiswa.data.data.tanggal_lahir,
                    agama: responseMahasiswa.data.data.agama,
                    keterangan_asal: responseMahasiswa.data.data.keterangan_asal,
                    role_mhs: responseMahasiswa.data.data.role_mhs
                });
                if(responseMahasiswa.data.data.jenis_kelamin == 0){
                    document.getElementById('perempuan').checked = true;
                }
                else{
                    document.getElementById('laki-laki').checked = true;
                }

                if(responseMahasiswa.data.data.status_keaktifan == 0){
                    document.getElementById('keluar').checked = true;
                }
                else{
                    document.getElementById('aktif').checked = true;
                }
                console.log(this.state.responseMahasiswa)
            }
            else{
                alert(responseMahasiswa.data.message);
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
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.handleFieldChange} 
                                                        className="form-control"
                                                        placeholder="Masukan email polban"
                                                    />
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.email}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="password" className="col-md-3 col-form-label text-md-right">Password</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="password"
                                                        name="password"
                                                        onChange={this.handleFieldChange} 
                                                        className="form-control"
                                                        placeholder="Masukan password"
                                                    />
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.email}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="nama" className="col-md-3 col-form-label text-md-right">Nama lengkap</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        name="nama_mhs"
                                                        value={this.state.nama_mhs}
                                                        onChange={this.handleFieldChange}
                                                        className="form-control"
                                                        placeholder="Masukan nama mahasiswa"
                                                    />
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.nama_mhs}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="alamat" className="col-md-3 col-form-label text-md-right">Alamat</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text"
                                                        name="alamat"
                                                        value={this.state.alamat}
                                                        onChange={this.handleFieldChange} 
                                                        className="form-control"
                                                        placeholder="Masukan alamat saat ini"
                                                    />
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.alamat}</span>
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
                                                </div>
                                                <br></br>
                                                    <span className="text-danger">*{this.state.errList.jenis_kelamin}</span>
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
                                                </div>
                                                <br></br>
                                                <span className="text-danger">*{this.state.errList.agama}</span>
                                            </div>
                                            <div className="form-group row">
                                                <label for="tanggal_lahir" className="col-md-3 col-form-label text-md-right">Tanggal lahir</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="date"
                                                        name="tanggal_lahir"
                                                        onChange={this.handleFieldChange}
                                                        value={this.state.tanggal_lahir} 
                                                        className="form-control"
                                                    />
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.tanggal_lahir}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="no_hp_mhs" className="col-md-3 col-form-label text-md-right">Nomor hp</label>
                                                <div className="col-md-8">
                                                    <div className="input-group">
                                                        <input 
                                                            type="text" 
                                                            name="no_hp_mhs"
                                                            onChange={this.handleFieldChange}
                                                            value={this.state.no_hp_mhs}
                                                            className="form-control"
                                                            min="1"
                                                            placeholder="08xx.."
                                                        />
                                                        <br></br>
                                                    <span className="text-danger">*{this.state.errList.no_hp_mhs}</span>
                                                    </div>
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
                                                        value={this.state.nama_ortu}
                                                        placeholder="Masukan nama orangtua / wali mahasiswa"
                                                    />
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.nama_ortu}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="no_hp_ortu" className="col-md-3 col-form-label text-md-right">Nomor hp orangtua / wali</label>
                                                <div className="col-md-8">
                                                    <div className="input-group">
                                                        <input 
                                                            type="text" 
                                                            name="no_hp_ortu"
                                                            onChange={this.handleFieldChange}
                                                            value={this.state.no_hp_ortu}
                                                            className="form-control"
                                                            min="1"
                                                            placeholder="08xx.."
                                                        />
                                                        <br></br>
                                                    <span className="text-danger">*{this.state.errList.no_hp_ortu}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="nim" className="col-md-3 col-form-label text-md-right">NIM</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text"
                                                        name="nim"
                                                        onChange={this.handleFieldChange}
                                                        value={this.state.nim} 
                                                        className="form-control"
                                                        placeholder="Masukan Nomor induk mahasiswa"
                                                    />
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.nim}</span>
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
                                                        if(this.state.id_prodi == id_prodi){
                                                            return (
                                                                <option selected value={prodi.id_prodi}>{prodi.nama_jurusan} / {prodi.nama_prodi}</option>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <option value={prodi.id_prodi}>{prodi.nama_jurusan} / {prodi.nama_prodi}</option>
                                                            )
                                                        }
                                                    })}
                                                    </select>
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.id_prodi}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="keterangan_asal" className="col-md-3 col-form-label text-md-right">Keterangan asal</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="keterangan_asal" name="keterangan_asal" onChange={this.handleFieldChange}>
                                                        <option value="ADIK">ADIK</option>
                                                        <option value="Bidikmisi">Bidikmisi</option>
                                                    </select>
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.keterangan_asal}</span>
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
                                                        if(this.state.id_kamar == id_kamar){
                                                            return (
                                                                <option selected value={kamar.id_kamar}>{kamar.nama_gedung} - {kamar.no_kamar}</option>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <option value={kamar.id_kamar}>{kamar.nama_gedung} - {kamar.no_kamar}</option>
                                                            )
                                                        }
                                                    })}
                                                    </select>
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.id_kamar}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="role_mhs" className="col-md-3 col-form-label text-md-right">Jabatan</label>
                                                <div className="col-md-8">
                                                    <select className="custom-select mr-sm-2" id="role_mhs" name="role_mhs" onChange={this.handleFieldChange}>
                                                        <option value="Mahasiswa">Mahasiswa</option>
                                                        <option value="Pengurus">Pengurus</option>
                                                    </select>
                                                    <br></br>
                                                    <span className="text-danger">*{this.state.errList.role_mhs}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="status_keaktifan" className="col-md-3 col-form-label text-md-right">Status keaktifan</label>
                                                <div className="col-md-8">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="status_keaktifan" id="aktif" value="1" onChange={this.handleFieldChange} />
                                                        <label className="form-check-label" for="aktif">
                                                            Aktif
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="status_keaktifan" id="keluar" value="0" onChange={this.handleFieldChange} />
                                                        <label className="form-check-label" for="keluar">
                                                            Keluar
                                                        </label>
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

export default EditMahasiswa;