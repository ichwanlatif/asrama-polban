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
                            <PageHeading title="Resign Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h4 className="text-primary text-center">Formulir resign asrama</h4>
                                        <h6 className="text-center text-muted">Isi data formulir resign dibawah ini</h6>
                                        <hr></hr>

                                        {/* Form resign*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Keterangan</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        className="form-control"
                                                        placeholder="Beri penjelasan mengenai alasan ingin resign dari asrama"
                                                        rows="3"
                                                        name="keterangan_resign"
                                                        onChange={this.handleFieldChange}
                                                        required>
                                                    </textarea>
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