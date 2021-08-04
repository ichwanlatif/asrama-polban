import React, { Component } from 'react';

class ForgotPassword extends Component {
    constructor(){
        super();
        this.state = {
        };
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
        )
    }
}

export default ForgotPassword;