import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';
import { createResign } from '../../service/resign';

class FormResign extends Component {
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
                            <PageHeading title="Resign Asrama Polban" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">

                                        {/* Form resign*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Alasan resign Asrama Polban</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="contoh: Masa tinggal habis"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="tanggal_resign" className="col-md-3 col-form-label text-md-right">Mulai resign</label>
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
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Kendaraan yang dibawa</label>
                                                <div className="col-md-8">
                                                    <select class="form-control" id="vehicle">
                                                        <option>Sepeda</option>
                                                        <option>Motor</option>
                                                        <option>Mobil</option>
                                                        <option>Tidak ada</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <label for="formfile" className="col-md-3 col-form-label text-md-right">STNK (opsional)</label>
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

export default FormResign;