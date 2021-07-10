import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Navigation/Footer';
import Pagination from "react-js-pagination";

import PageHeading from '../../components/PageHeading';
import api from '../../service/api';
// import { getRiwayatPresensi } from '../../service/presensi';

class RiwayatPresensi extends Component {
    constructor(){
        super();
        this.state = {
            role: '',
            datas: [],

            // pagination
            currentData: [],
            activePage: 1,
            itemPerPage : 10
        };
    }

    componentDidMount(){
        this.setState({
            role: localStorage.getItem("user_role")
        });
        api().get('api/presensi/user/' + localStorage.getItem('user_id')).then(response =>{
            if(response.data.status === 'success'){
                this.setState({
                    datas: response.data.data
                })
                console.log(this.state.datas)
            }
            else{
                alert(response.data.msg);
            }
        })
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});

        const data = this.state.datas;
        const offset = (this.state.activePage - 1) * this.state.itemPerPage;
        const currentData = data.slice(offset, offset + this.state.itemPerPage);

        this.setState({ currentData });
    }

    render() {
        const data = this.state.datas;

        // pagination
        const offset = (this.state.activePage - 1) * this.state.itemPerPage;
        const currentData = data.slice(offset, offset + this.state.itemPerPage);

        let TableStatus;
        if (this.state.datas.length == 0) {
            TableStatus = <h6 className="text-center">Tidak ada presensi</h6>;
          } else {
            TableStatus = <h6>Menampilkan {this.state.itemPerPage * (this.state.activePage - 1) +1} sampai {this.state.itemPerPage * (this.state.activePage - 1) +currentData.length} dari {data.length}</h6>;
        }

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
                            <PageHeading title="Riwayat Presensi Kehadiran" />
                            <div className="col-lg-12 col-md-12">
                                <div className="card my-5">
                                    <div className="card-header">
                                        <h6 className="text-primary">Riwayat Presensi Kehadiran</h6>
                                    </div>
                                    <div className="card-body">

                                        {/* Tabel Presensi */}
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Tanggal</th>
                                                    <th scope="col">Waktu presensi</th>
                                                    <th scope="col">Koordinat GPS</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Kondisi</th>
                                                    <th scope="col">Suhu badan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentData.map(presensi => {
                                                        const {
                                                            id,
                                                            status_presensi,
                                                            latitude,
                                                            longitude,
                                                            kondisi_kesehatan,
                                                            suhu_badan,
                                                            created_at,
                                                        } = presensi;
                                                        let status, color;
                                                        if(presensi.status_presensi === 0){
                                                            status = "Alfa"
                                                            color = "badge badge-pill badge-danger"
                                                        }
                                                        else if(presensi.status_presensi === 1){
                                                            status = "Hadir"
                                                            color = "badge badge-pill badge-success"
                                                        }
                                                        else{
                                                            status = "Izin"
                                                            color = "badge badge-pill badge-info"
                                                        }
                                                        return (
                                                            <tr>
                                                                <td>{new Date(presensi.created_at).toDateString()}</td>
                                                                <td>{new Date(presensi.created_at).toTimeString()}</td>
                                                                <td>{presensi.latitude + ', ' + presensi.longitude}</td>
                                                                <td>
                                                                    <span className={color}>{status}
                                                                    </span>
                                                                </td>
                                                                <td>{presensi.kondisi_kesehatan}</td>
                                                                <td>{presensi.suhu_badan}&deg;C</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                        {TableStatus}
                                        
                                        {/* pagination */}
                                        <div className="d-flex justify-content-end">
                                            <Pagination
                                                itemClass="page-item"
                                                linkClass="page-link"
                                                activePage={this.state.activePage}
                                                itemsCountPerPage={this.state.itemPerPage}
                                                totalItemsCount={data.length}
                                                pageRangeDisplayed={3}
                                                onChange={this.handlePageChange.bind(this)}
                                            />
                                        </div>

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

export default RiwayatPresensi;