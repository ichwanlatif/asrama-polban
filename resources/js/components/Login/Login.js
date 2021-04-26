import { useState } from "react";
import { loginAuth } from "../../service/auth";

const Login = () =>{
    const [formInput, setFormInput] = useState({
        email: '',
        password: ''
    });

    const updateFormInput = e => {
        e.persist()
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const signIn = e => {
        e.preventDefault()
        loginAuth(formInput)
    }

    return (
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
                                    <div className="d-none d-lg-block">
                                        <div className="py-4"></div>
                                    </div>
                                    <h3 className="card-title my-2">ASRAMA POLBAN</h3>
                                    <hr></hr>
                                    <form>
                                        <div className="form-group">
                                            <input
                                            type="email"
                                            name="email"
                                            className="form-control rounded-pill my-2"
                                            placeholder="Email"
                                            onChange={updateFormInput}
                                            required/>
                                        </div>
                                        <div className="form-group">
                                            <input 
                                            type="password"
                                            name="password"
                                            className="form-control rounded-pill my-2" 
                                            placeholder="Password"
                                            onChange={updateFormInput} />
                                        </div>
                                        <button className="btn btn-primary btn-lg btn-block rounded-pill my-4" onClick={signIn}>
                                            Login
                                        </button>   
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
