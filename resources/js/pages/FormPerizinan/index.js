import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';
import { reduce } from 'lodash';

class FormPerizinan extends Component {
    constructor(){
        super();
        this.state = {
            keterangan_izin: '',
            tanggal_pergi: '',
            tanggal_pulang: '',
            surat_pendukung: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleFieldChange(e){
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    }

    handleFileChange(e){
        let files = e.target.files || e.dataTransfer.files;
        if(!files.length)
            return;
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                surat_pendukung: e.target.result
            })
        }
        reader.readAsDataURL(file);
    }

    handleSubmit(e){
        e.preventDefault()
        // createPerizinan(this.state);
        console.log(this.state)
    }

    // componentDidMount(){
    //     this.setState({
    //         role: localStorage.getItem("user_role")
    //     });
    // }

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
                            <PageHeading title="Izin Pergi Asrama" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h4 className="text-primary text-center">Formulir izin pergi asrama</h4>
                                        <h6 className="text-center text-muted">Isi data formulir perizinan dibawah ini</h6>
                                        <hr></hr>

                                        {/* Form perizinan*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="description" className="col-md-3 col-form-label text-md-right">Keterangan</label>
                                                <div className="col-md-8">
                                                    <textarea 
                                                        name="keterangan_izin"
                                                        className="form-control"
                                                        placeholder="Beri penjelasan mengenai alasan diharuskan pergi dari asrama"
                                                        rows="3"
                                                        onChange={this.handleFieldChange}
                                                        required>
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="startdate" className="col-md-3 col-form-label text-md-right">Mulai izin</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                        name="tanggal_pergi"
                                                        onChange={this.handleFieldChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="enddate" className="col-md-3 col-form-label text-md-right">Berakhir pada</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"
                                                        name="tanggal_pulang"
                                                        onChange={this.handleFieldChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="formfile" className="col-md-3 col-form-label text-md-right">File pendukung</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        className="form-control-file" 
                                                        type="file"
                                                        onChange={this.handleFileChange}
                                                    />
                                                    <small className="text-muted">Format yang didukung: *.jpg, *.pdf</small>
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

export default FormPerizinan;