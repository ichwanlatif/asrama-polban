import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import CardInfo from '../../components/Cards/Info';
import PageHeading from '../../components/PageHeading';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            role: "1"
        };
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
                                <PageHeading title="Dashboard" />
                                <div className="row">
                                    <CardInfo title="Gedung Asrama"
                                        icon="house-user"
                                        color="primary"
                                        value="A" />

                                    <CardInfo title="Jumlah Hadir"
                                        icon="calendar-check"
                                        color="success"
                                        value="60" />

                                    <CardInfo title="Jumlah Alfa"
                                        icon="calendar-times"
                                        color="danger"
                                        value="5" />

                                    <CardInfo title="Jumlah Izin"
                                        icon="address-book"
                                        color="info"
                                        value="2" />
                                </div>
                            </div>
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