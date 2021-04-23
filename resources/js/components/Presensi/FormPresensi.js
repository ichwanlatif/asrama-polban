import React, {Component} from 'react';

class FormPresensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentDateTime: new Date().toLocaleString()
        }
    }
    componentDidMount() {
        setInterval(() => {
          this.setState({
            currentDateTime : new Date().toLocaleString()
          })
        }, 1000)
    }
    render(){
        return (
            <div className="col-lg-9 col-md-9">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title text-center">Form presensi</h1>
                        <h6 className="text-center text-muted">Isi data formulir presensi dibawah ini</h6>
                        <hr></hr>
                        
                        {/* Form presensi*/}
                        <form>
                            <div className="form-group row">
                                <label for="name" className="col-md-4 col-form-label text-md-right">Waktu presensi</label>
                                <div className="col-md-6">
                                    <p>
                                        { this.state.currentDateTime }
                                    </p>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="name" className="col-md-4 col-form-label text-md-right">Koordinat presensi</label>
                                <div className="col-md-6">
                                    <input 
                                        id="coordinat" 
                                        type="text" 
                                        className="form-control" 
                                        name="coordinat"
                                        disabled 
                                    />
                                    {/* Conditional statement */}
                                    <small className="text-muted">Status: </small>
                                    <small className="text-warning">Belum mendapatkan lokasi</small>
                                </div>
                                <div className="input-group-btn"> 
                                        <button className="btn btn-primary" type="button">Get location</button>
                                </div>
                            </div>
                            <div className="form-group row mb-0">
                                <div className="col-md-6 offset-md-4">
                                    <button type="submit" className="btn btn-success">
                                        Presensi
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default FormPresensi;