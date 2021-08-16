import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import PageHeading from '../../components/PageHeading';
import api from '../../service/api';

// function loadingAnimation() {
//     return new Promise(function(resolve) {
//       setTimeout(() => resolve([1, 2, 3]), 1000);
//     });
// }

class ImportMahasiswa extends Component {
    constructor(){
        super();
        this.state = {
            role: "",
            isLoading: false,
            errList: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
    }

    async handleSubmit(e){
        e.preventDefault()

        // this.setState({ isLoading: true });

        const data = new FormData()

        if(this.state.file != undefined){
            data.append('file', this.state.file)
        }

        // console.warn(this.state.file);

        console.log(this.state);

        await api().post('api/mahasiswa/import', data).then(response => {
            if(response.data.status == 'success'){
                console.log(response.data.msg)
                window.location.assign('/#/dashboard')
            }
            else{
                this.setState({
                    errList: response.data.message
                })
            }
        })

        // Set status animasi loading
        // loadingAnimation().then(list => {
        //     this.setState({
        //     isLoading: false,
        //     list,
        //     });
        // });
    }

    handleFileChange(e){
        let files = e.target.files[0];
        this.setState({
            file: files
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
                            <PageHeading title="Import Mahasiswa" />

                            {/* Path */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Import Mahasiswa</li>
                                </ol>
                            </nav>

                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-body">
                                        <h6 className="text-muted">Upload file mahasiswa pada formulir dibawah ini</h6>
                                        <hr></hr>

                                        {/* Form perizinan*/}
                                        <form>
                                            <div className="form-group row">
                                                <label for="formfile" className="col-md-3 col-form-label text-md-right">File mahasiswa</label>
                                                <div className="col-md-8">
                                                    <input 
                                                        className="form-control-file" 
                                                        type="file"
                                                        name="file"
                                                        onChange={this.handleFileChange}
                                                    />
                                                    <small className="text-muted">Format yang didukung: *.xls, *.xlsx</small>
                                                    <br></br>
                                                    <span className="text-danger">{this.state.errList.file}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-8 offset-md-3 mb-2">
                                                    <button type="submit" onClick={this.handleSubmit} className="btn btn-success">
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

export default ImportMahasiswa;