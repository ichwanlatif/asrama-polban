import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

//Role
import DashboardMahasiswa from './Mahasiswa';
import DashboardPengelola from './Pengelola';
import DashboardWadir from './Wadir';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            role: ""
        };
    }
    
    dashboardSwitch(role) {
        switch(role) {
            case "1":
                return <DashboardMahasiswa />;
            case "2":
                return <DashboardPengelola/>;
            case "3":
                return <DashboardWadir/>;
        }
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
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
                            {/* Dynamic role item */}
                            {this.dashboardSwitch(this.state.role)}
                        </div>
                        {/* <!-- Footer --> */}
                        <Footer />
                        {/* <!-- End of Footer --> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;