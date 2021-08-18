import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

import api from '../../service/api';

class DetailMahasiswa extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            
        };
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        })

        const {id} = this.props.match.params
        api().get('api/mahasiswa/' + id).then(responseMahasiswa =>{
            if(responseMahasiswa.data.status == 'success'){
                this.setState({
                    id_mhs:responseMahasiswa.data.data.id_mhs,
                    email: responseMahasiswa.data.data.email,
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
                    prodi: responseMahasiswa.data.data.nama_prodi,
                    jurusan: responseMahasiswa.data.data.nama_jurusan,
                    gedung: responseMahasiswa.data.data.nama_gedung,
                    kamar: responseMahasiswa.data.data.no_kamar,
                    keterangan_asal: responseMahasiswa.data.data.keterangan_asal,
                    role_mhs: responseMahasiswa.data.data.role_mhs
                });
                console.log(this.state.responseMahasiswa)
            }
            else{
                alert(responseMahasiswa.data.message);
            }
        })
        ;
    }

    render() {
        let jenis_kelamin;
        if(this.state.jenis_kelamin == 0) {
            jenis_kelamin = "Perempuan"
        }else{
            jenis_kelamin = "Laki-laki"
        }

        let status_keaktifan;
        if(this.state.status_keaktifan == 0) {
            status_keaktifan = "Tidak aktif"
        }else{
            status_keaktifan = "Aktif"
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
                            <PageHeading title="Detail Mahasiswa" />

                            {/* Path */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/data-mahasiswa">Data Mahasiswa</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Detail Mahasiswa</li>
                                </ol>
                            </nav>

                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">

                                        {/* Data mahasiswa*/}
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Email</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.email}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Nama lengkap</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.nama_mhs}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Alamat</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.alamat}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Jenis kelamin</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={jenis_kelamin}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Agama</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.agama}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Tanggal lahir</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.tanggal_lahir}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Nomor hp</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.no_hp_mhs}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Nama orangtua / wali</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.nama_ortu}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Nomor hp orangtua / wali</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.no_hp_ortu}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">NIM</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.nim}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Jurusan / Program studi</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.jurusan +" / "+ this.state.prodi}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Keterangan asal</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.keterangan_asal}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Kamar asrama</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.gedung +" - "+ this.state.kamar}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Peran</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={this.state.role_mhs}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label text-md-right">Status keaktifan</label>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control-plaintext"
                                                    value={status_keaktifan}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-8 offset-md-3 mb-2">
                                                <Link to={"/edit-mahasiswa/"+ this.state.id_mhs} className="btn btn-success"><i className="fas fa-edit"></i> Sunting</Link>
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