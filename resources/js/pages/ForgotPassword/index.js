import React, { Component } from 'react';
import api from '../../service/api';

function loadingAnimation() {
    return new Promise(function(resolve) {
      setTimeout(() => resolve([1, 2, 3]), 1000);
    });
}

class ForgotPassword extends Component {
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
        console.log(name, value);
    }

    async handleSubmit(e){
        this.setState({ isLoading: true });

        e.preventDefault();
        await api().post('api/forgot-password', ({
            email: this.state.email,
        })).then(response => {
            if(response.data.status == 'success'){
                alert(response.data.message);
                window.location.assign('asrama-polban/public/#/');
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
                                <h4 className="text-primary text-center">Formulir lupa password</h4>
                                <h6 className="text-center text-muted">Isi data formulir lupa password dibawah ini</h6>
                                <hr/>

                                {/* Form password*/}
                                <form>
                                    <div className="form-group row">
                                        <label for="email" className="col-md-3 col-form-label text-md-right">Email</label>
                                        <div className="col-md-8">
                                            <input 
                                                id="email" 
                                                type="email" 
                                                className="form-control" 
                                                name="email"
                                                placeholder="Masukan email Polban anda"
                                                required
                                                onChange={this.handleFieldChange}
                                            />
                                            <span className="text-danger">{this.state.errList.email}</span>
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

export default ForgotPassword;