import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';

import CardInfo from '../../components/Cards/Info';
import PageHeading from '../../components/PageHeading';

class Dashboard extends Component {
    
    render() {
        return (
            <div>
                <div id="wrapper">
                {/* <!-- Sidebar --> */}
                <Sidebar />
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
                                        icon="calendar"
                                        color="primary"
                                        value="A" />

                                    <CardInfo title="Jumlah Hadir"
                                        icon="calendar"
                                        color="success"
                                        value="60" />

                                    <CardInfo title="Jumlah Izin"
                                        icon="clipboard"
                                        color="warning"
                                        value="2" />

                                    <CardInfo title="Jumlah Alfa"
                                        icon="comments"
                                        color="danger"
                                        value="5" />
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