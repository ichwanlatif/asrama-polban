import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';

class ChangePassword extends Component {
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
                            <PageHeading title="Ganti Password" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h4 className="text-primary text-center">Formulir ganti password</h4>
                                        <h6 className="text-center text-muted">Isi data formulir password dibawah ini</h6>
                                        <hr/>

                                        {/* Form presensi*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="current_password" className="col-md-3 col-form-label text-md-right">Password Lama</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        id="current_password" 
                                                        type="password" 
                                                        className="form-control" 
                                                        name="current_password"
                                                        placeholder="Masukan password saat ini"
                                                        />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="password" className="col-md-3 col-form-label text-md-right">Password Baru</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        id="password" 
                                                        type="password" 
                                                        className="form-control" 
                                                        name="password"
                                                        placeholder="Masukan password baru"
                                                        />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="password-confirm" className="col-md-3 col-form-label text-md-right">Konfirmasi Password Baru</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        id="password-confirm" 
                                                        type="password-confirm" 
                                                        className="form-control" 
                                                        name="password-confirm"
                                                        placeholder="Masukan kembali password baru"
                                                        />
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

export default ChangePassword;