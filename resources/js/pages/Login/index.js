import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginAuth } from '../../service/auth';

class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.body.classList.add('bg-gradient-primary');
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
        loginAuth({
            email: this.state.email,
            password: this.state.password
        })
    }

    render() {
        if(Cookies.get('cake')){
            window.location.assign("/#/Dashboard")
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* <!-- Nested Row within Card Body --> */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Selamat Datang!</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                            <   input 
                                                    type="email"
                                                    name="email"
                                                    className="form-control form-control-user" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Masukan Alamat Email"
                                                    value={this.state.email}
                                                    onChange={this.handleFieldChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="password"
                                                    name="password"
                                                    className="form-control form-control-user"
                                                    placeholder="Masukan Password"
                                                    value={this.state.password}
                                                    onChange={this.handleFieldChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                                <label className="custom-control-label" for="customCheck">Ingatkan Saya</label>
                                            </div>
                                            </div>
                                            <button  onClick={this.handleSubmit} className="btn btn-primary btn-user btn-block">
                                                Masuk
                                            </button>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <Link className="small" tol="#">Lupa Password?</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Login;