import axios from "axios";
import { Redirect } from 'react-router-dom';
import React, { Component } from "react";

class Login extends Component{
    constructor (props){
        super(props);
        this.state = {
            email: '',
            password: '',
            msg: '',
            isLoading: false,
            redirect: false,
            errMsgEmail: "",
            errMsgPwd: "",
            errMsg: "",
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);

    }


    handleSubmit(){
        console.log(this.state.email, this.state.password);
        this.setState({ isLoading: true });
        axios.post("/api/login", {
            email: this.state.email,
            password: this.state.password,
        })
        .then(response => {
            this.setState({ isLoading: false });
            if(response.status === 200){
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", JSON.stringify(response.data));
                this.setState({
                    msg: response.data.message,
                    redirect: true,
                });
                console.log(this.state.redirect);
            }
            if(response.data.status === 'failed' && response.data.success === undefined){
                this.setState({
                    errMsg: response.data.message,
                });
                setTimeout(() => {
                    this.setState({ errMsg: "" });
                }, 2000);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/map" />
        }
        const login = localStorage.getItem("isLoggedIn");
        if(login){
            return <Redirect to="/map"/>
        }
        return (
            <div style={{ 
                    backgroundColor: 'RoyalBlue',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-8 col-lg-8 mx-auto">
                            <div className="card rounded text-center my-5 shadow-lg">
                                <div className="card-body">
                                    <div className="row">
                                        {/* Logo */}
                                        <div className="col-sm-12 col-md-12 col-lg-6">
                                            <div className="d-none d-lg-block">
                                                <div className="px-5 py-5">
                                                    <img src="/images/web/logo_dormitory.jpg" className="card-img img-fluid" alt="logo" />
                                                </div>
                                            </div>
                                            <div className="d-lg-none">
                                                <div className="px-5">
                                                    <img src="/images/web/logo_dormitory.jpg" className="card-img img-fluid" alt="logo" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Form */}
                                        <div className="col-sm-12 col-md-12 col-lg-6 py-5">
                                            <h3 className="card-title my-2">ASRAMA POLBAN</h3>
                                            <hr></hr>
                                            <form>
                                                <div className="form-group">
                                                    <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control rounded-pill my-2"
                                                    placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={this.handleFieldChange}
                                                    required/>
                                                    <span className="text-danger">{this.state.msg}</span>
                                                    <span className="text-danger">{this.state.errMsgEmail}</span>
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                    type="password"
                                                    name="password"
                                                    className="form-control rounded-pill my-2" 
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    onChange={this.handleFieldChange} />
                                                    <span className="text-danger">{this.state.errMsgPwd}</span>
                                                </div>
                                                <p className="text-danger">{this.state.errMsg}</p>
                                                <button className="btn btn-primary btn-lg btn-block rounded-pill my-4" onClick={this.handleSubmit}>
                                                    Login
                                                    {this.state.isLoading ? (
                                                        <span
                                                        className="spinner-border spinner-border-sm ml-5"
                                                        role="status"
                                                        aria-hidden="true"
                                                        ></span>
                                                    ) : (<span></span>
                                                    )}
                                                </button>   
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
