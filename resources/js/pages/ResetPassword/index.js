import React, { Component } from 'react';
import api from '../../service/api';

function loadingAnimation() {
    return new Promise(function(resolve) {
      setTimeout(() => resolve([1, 2, 3]), 1000);
    });
}

class ResetPassword extends Component {
    constructor(){
        super();
        this.state = {
            errList: [],

            //loading
            isLoading:false,
            list: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
        console.log(e.target)
    }

    async handleSubmit(e){
        this.setState({ isLoading: true });

        e.preventDefault();
        const { token } = this.props.match.params;

        await api().post('api/reset-password', ({
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            token: token,
        })).then(response => {
            if(response.data.status == 'success'){
                alert(response.data.message);
                window.location.assign('/#/');
            }
        }).catch(error => {
            alert(error.response.data.message)
            this.setState({
                errList: error.response.data.errors
            });
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
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-10 col-sm-12">
                        <div className="card my-5">
                            <div className="card-body">
                                <h4 className="text-primary text-center">Formulir reset password</h4>
                                <h6 className="text-center text-muted">Isi data formulir reset password dibawah ini</h6>
                                <hr/>

                                {/* Form password*/}
                                <form>
                                    <div className="form-group row">
                                        <label for="password" className="col-md-3 col-form-label text-md-right">Password Baru</label>
                                        <div className="col-md-8">
                                            <input 
                                                id="password" 
                                                type="password" 
                                                className="form-control"
                                                placeholder="Masukan password baru"
                                                name="password"
                                                onChange={this.handleFieldChange}
                                                required
                                                />
                                                <span className="text-danger">*{this.state.errList.password}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="confirm_password" className="col-md-3 col-form-label text-md-right">Konfirmasi Password Baru</label>
                                        <div className="col-md-8">
                                            <input 
                                                id="password" 
                                                type="password" 
                                                className="form-control"
                                                name="password_confirmation"
                                                placeholder="Masukan kembali password baru"
                                                onChange={this.handleFieldChange}
                                                required
                                                />
                                                <span className="text-danger">*{this.state.errList.password_confirmation}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-8 offset-md-3 mb-2">
                                            <button type="submit" className="btn btn-success" onClick={this.handleSubmit} disabled={this.state.isLoading}>
                                            {this.state.isLoading ? <i className="fas fa-spinner fa-pulse"></i> : <i className="fas fa-check"></i>} Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword;