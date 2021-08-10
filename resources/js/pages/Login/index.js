import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../service/api';
import { logIn, notLoggedIn } from '../../service/token';

function loadingAnimation() {
    return new Promise(function(resolve) {
      setTimeout(() => resolve([1, 2, 3]), 1000);
    });
}

class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errList: [],
            
            //loading
            isLoading:false,
            list: []
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


    async handleSubmit(e){
        this.setState({ isLoading: true });

        e.preventDefault();
        await api().get('/sanctum/csrf-cookie').then(() => {
            api().post('api/login', ({
                email: this.state.email,
                password: this.state.password
            })).then(response => {
                if(response.data.status !== 'success'){
                    if(response.data.message === 'incorrect'){
                        alert("Email atau password salah!")
                    }
                    else if(response.data.message === 'unregist'){
                        alert("Akun tidak terdaftar!");
                    }
                    else{
                        this.setState({
                            errList: response.data.message
                        })
                    }
                    notLoggedIn();
                }
                else{
                    localStorage.setItem('user_role', response.data.data.role);
                    // alert(response.data.data.id_users)
                    if(response.data.data.role == 1){
                        var endPoint = "api/mahasiswaByUser/" + response.data.data.id_users;
                        api().get(endPoint).then(User => {
                            if(User.data.status !== 'success'){
                                alert(User.data.message)
                            }
                            else{
                                localStorage.setItem('user_id', User.data.data.id_mhs);
                                localStorage.setItem('nama_mhs', User.data.data.nama_mhs);
                                logIn(response.data.token);
                                window.location.assign('/#/Dashboard')
                            }
                        })
                    }
                    else{
                        logIn(response.data.token);
                        window.location.assign('/#/Dashboard')
                    }
                }
            })
        })

        // Set status animasi loading
        loadingAnimation().then(list => {
            this.setState({
              isLoading: false,
              list,
            });
        });
    }

    render() {
        if(Cookies.get('cake')){
            window.location.assign("/#/Dashboard")
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-12">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div className="p-5">
                                    <div className="text-center">
                                    <img className="img-fluid mx-auto" src="/images/web/logo-web-polban.png" width="300"/>
                                    <hr/>
                                    <h1 className="h4 text-gray-900 mb-4">
                                        PRESENSI DAN PERIZINAN<br/>ASRAMA POLBAN
                                    </h1>
                                    </div>

                                    {/* Login Form */}
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
                                            <span className="text-danger">{this.state.errList.email}</span>
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
                                            <span className="text-danger">{this.state.errList.password}</span>
                                        </div>
                                        <button  onClick={this.handleSubmit} className="btn btn-primary btn-user btn-block" disabled={this.state.isLoading}>
                                            {this.state.isLoading ? <i className="fas fa-spinner fa-pulse"></i> : <i className="fas fa-sign-in-alt"></i>} Masuk
                                        </button>
                                    </form>

                                    <div className="text-center">
                                        <Link className="small" to="forgot-password">Lupa Password?</Link>
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