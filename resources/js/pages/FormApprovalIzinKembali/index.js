import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

class FormApprovalIzinKembali extends Component {
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
                            <PageHeading title="Approval Perizinan Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h4 className="text-primary text-center">Formulir approval izin kembali asrama</h4>
                                        <h6 className="text-center text-muted">Isi data formulir approval perizinan dibawah ini</h6>
                                        <hr></hr>

                                        {/* Form presensi*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="name" className="col-md-3 col-form-label text-md-right">Nama</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext"
                                                        value="Rizqa"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Keterangan</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        class="form-control-plaintext"
                                                        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                                        rows="3">
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="startdate" className="col-md-3 col-form-label text-md-right">Mulai izin</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext" 
                                                        value="25 Mei 2021"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="enddate" className="col-md-3 col-form-label text-md-right">Berakhir pada</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="text" 
                                                        className="form-control-plaintext" 
                                                        value="5 Juni 2021"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="formfile" className="col-md-3 col-form-label text-md-right">File pendukung</label>
                                                <div className="col-md-8">
                                                    <Link to="#" className="btn btn-light btn-icon-split">
                                                        <span className="icon text-gray-600">
                                                            <i className="fas fa-file-download"></i>
                                                        </span>
                                                        <span className="text">Unduh file</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="statusApproval" className="col-md-3 col-form-label text-md-right">Status</label>
                                                <div className="col-md-8">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="status" id="setuju" value="1"/>
                                                        <label className="form-check-label" for="setuju">
                                                            Setuju
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="status" id="tolak" value="0"/>
                                                        <label className="form-check-label" for="tolak">
                                                            Tolak
                                                        </label>
                                                    </div>
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

export default FormApprovalIzinKembali;