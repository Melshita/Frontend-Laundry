import React from "react";
import axios from "axios";
import { baseUrl } from "../config"

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: [],
            visible: true,
        }
    }

    getData() {
        let endpoint = `${baseUrl}/transaksi`
        axios.get(endpoint)
            .then(response => {
                let dataTransaksi = response.data
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty

                        total += (harga * qty)
                    }

                    // tambahkan key "total"
                    dataTransaksi[i].total = total
                }

                this.setState({ transaksi: dataTransaksi })
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData()

        let user = JSON.parse(localStorage.getItem("users"))
        // Cara kedua
        if (user.role === 'admin' || user.role === 'kasir') {
            this.setState({
                visible: true
            })
        } else (
            this.setState({
                visible: false
            })
        )
    }

    HapusTransaksi(id) {
        if (window.confirm("Apakah anda yakin ingin menghapus transaksi ini ?")) {
            let endpoint = `${baseUrl}/transaksi/${id}`

            axios.delete(endpoint)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    convertStatus(id_transaksi, status) {
        if (status === 1) {
            return (
                <div className="badge bg-info">
                    Transaksi Baru
                    <br />

                    <a onClick={() => this.changeStatus(id_transaksi, 2)}
                        className="text-danger">
                        Click here to the next level
                    </a>
                </div>
            )
        } else if (status === 2) {
            return (
                <div className="badge bg-warning">
                    Sedang diproses
                    <br />

                    <a onClick={() => this.changeStatus(id_transaksi, 3)}
                        className="text-danger">
                        Click here to the next level
                    </a>
                </div>
            )
        } else if (status === 3) {
            return (
                <div className="badge bg-primary">
                    Siap diambil
                    <br />

                    <a onClick={() => this.changeStatus(id_transaksi, 4)}
                        className="text-danger">
                        Click here to the next level
                    </a>
                </div>
            )
        } else if (status === 4) {
            return (
                <div className="badge bg-success">
                    Telah diambil
                </div>
            )
        }
    }

    changeStatus(id, status) {
        if (window.confirm('Apakah Anda yakin ingin mengganti status transaksi ini?')) {
            let endpoint = `${baseUrl}/transaksi/status/${id}`
            let data = {
                status: status
            }

            axios.post(endpoint, data)
                .then(response => {
                    window.alert(`Status telah diubah`)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    convertStatusBayar(id_transaksi, dibayar) {
        if (dibayar === 0) {
            return (
                <div className="badge bg-danger text-white">
                    Belum Dibayar
                    <br />

                    <a className="text-primary"
                        onClick={() => this.changeStatusBayar(id_transaksi, 1)}>
                        Click here to change paid status
                    </a>
                </div>
            )
        } else if (dibayar === 1) {
            return (
                <div className="badge bg-success text-white">
                    Sudah Dibayar
                </div>
            )
        }
    }

    changeStatusBayar(id, status) {
        if (window.confirm('Apakah anda yakin ingin mengubah status pembayaran ini?')) {
            let endpoint = `${baseUrl}/transaksi/bayar/${id}`
            axios.get(endpoint)
                .then(response => {
                    window.alert('Status pembayaran telah diubah')
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header bg-info">
                    <h4 className="text-white">
                        List Transaksi
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {this.state.transaksi.map(trans => (
                            <li className="list-group-item">
                                <div className="row">
                                    {/** Member area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Member
                                        </small><br />
                                        {trans.member.nama}
                                    </div>

                                    {/** Tanggal Transaksi area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Tanggal Transaki
                                        </small><br />
                                        {trans.tgl}
                                    </div>

                                    {/** Batas Waktu area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Batas Waktu
                                        </small><br />
                                        {trans.batas_waktu}
                                    </div>

                                    {/** Tanggal Bayar area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Tanggal Bayar
                                        </small><br />
                                        {trans.tgl_bayar}
                                    </div>

                                    {/** Status area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Status
                                        </small><br />
                                        {this.convertStatus(trans.id_transaksi, trans.status)}
                                    </div>

                                    {/** Status Pembayaran area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Status Pembayaran
                                        </small><br />
                                        {this.convertStatusBayar(trans.id_transaksi, trans.dibayar)}
                                    </div>

                                    {/* this is total area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Total
                                        </small><br />
                                        Rp {trans.total}
                                    </div>

                                    {/* DELETE BUTTON */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Option
                                        </small><br />
                                        {/* <button className='btn btn-sm btn-danger'
                                            onClick={() => this.HapusTransaksi(trans.id_transaksi)}>
                                            Hapus
                                        </button> */}
                                        <button className={`btn btn-sm btn-danger ${this.state.visible ? `` : `d-none`}`}
                                        onClick={() => this.HapusTransaksi(trans.id_transaksi)}>
                                        Delete
                                    </button>
                                    </div>
                                </div>

                                <hr />

                                {/** Area Detail Transaksi */}
                                <h5>Detail Transaksi</h5>
                                {trans.detail_transaksi.map(detail => (
                                    <div className="row">
                                        {/** area Nama Paket */}
                                        <div className="col-lg-3">
                                            {detail.paket.jenis_paket}
                                        </div>
                                        {/** area Quantity */}
                                        <div className="col-lg-2">
                                            Qty :  {detail.qty}
                                        </div>
                                        {/** area Harga Paket */}
                                        <div className="col-lg-3">
                                            @ Rp {detail.paket.harga}
                                        </div>
                                        {/** area Harga Total */}
                                        <div className="col-lg-4">
                                            Total Rp {detail.paket.harga * detail.qty}
                                        </div>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}