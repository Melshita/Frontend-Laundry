import React from "react";
import { Modal } from "bootstrap";
import axios from "axios"
class Users extends React.Component {
    constructor() {
        super()
        this.state = {

            users: [
                {
                    id_user: 1, nama: "Yuki",
                    username: "Yuki Ken",
                    role: "Admin"
                },
                {
                    id_user: 2, nama: "Murayama",
                    username: "Murayama",
                    role: "Admin"
                },
                {
                    id_user: 3, nama: "Bokuto",
                    username: "Bokuto",
                    role: "Admin"
                },
                {
                    id_user: 4, nama: "Finn",
                    username: "Finn",
                    role: "Admin"
                }
            ],

            id_user: "",
            nama: "",
            username: "",
            role: "",
            action: ""
        }
    }

    tambahData() {
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show() // menampilkan modal

        // reset state untuk form member
        this.setState({
            action: "tambah",
            id_user: Math.random(1, 100000),
            nama: "",
            username: "",
            role: ""
        })
    }

    ubahData(id_user) {
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show() // menampilkan modal

        // mencari index posisi dari data member yang akan diubah
        let index = this.state.users.findIndex(
            user => user.id_user === id_user
        )

        // reset state untuk form users
        this.setState({
            action: "ubah",
            id_user: id_user,
            nama: this.state.users[index].nama,
            username: this.state.users[index].username,
            role: this.state.users[index].role
        })
    }
    simpanData(event) {
        event.preventDefault();
        // preventDefault -> mencegah aksi default dari form submit

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/api/users"
            // menampung data isian dari user
            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                role: this.state.role
            }

            // tambahkan ke state user (array)
            //let temp = this.state.users
            //temp.push(data) // menambah data pada array
            //this.setState({ users: temp })
            axios.post(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            // menghilangkan modal
            this.modalUser.hide()
        } else if (this.state.action === "ubah") {
            let endpoint = "http://localhost:8000/api/users/" + this.state.id_user

            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                role: this.state.role
            }

            axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))


            // let temp = this.state.users
            // let index = temp.findIndex(
            //    user => user.id_user === this.state.id_user
            // )

            // temp[index].nama = this.state.nama
            // temp[index].alamat = this.state.alamat
            // temp[index].jenis_kelamin = this.state.jenis_kelamin
            // temp[index].telepon = this.state.telepon

            // this.setState({ members: temp })

            // this.modalMember.hide()
        }
    }

    hapusData(id_user) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // mecari posisi index dari data yang dihapus
            let temp = this.state.users
            let index = temp.findIndex(user => user.id_user === id_user)

            // dihapus data pada array
            temp.splice(index, 1)

            this.setState({ users: temp })
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/api/users"
        // method = GET
        axios.get(endpoint)
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch(error => console.log(error))
    }
    componentDidMount() {
        // fungsi ini dijalankan setelah fungsi render berjalan
        this.getData()
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header bg-success">
                        <h3 className="text-white">
                            List of Users
                        </h3>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.users.map(user => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <small className="text-info">Nama</small> <br />
                                        <h5>{user.nama}</h5>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-info">Username</small> <br />
                                        <h5>{user.username}</h5>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-info">Role</small> <br />
                                        <h5>{user.role}</h5>
                                    </div>
                                    <div className="col-lg-1">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-warning"
                                                onClick={() => this.ubahData(user.id_user)}>
                                                Edit
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-lg-1">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-danger"
                                                onClick={() => this.hapusData(user.id_user)}>
                                                Delete
                                            </button>
                                            <div className="d-grip gad-2">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button className="btn btn-success btn-sm my-2"
                        onClick={() => this.tambahData()}>
                        Tambah Data Users
                    </button>
                </div>

                {/* form modal user */}
                <div className="modal" id="modal_user">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form Data Users
                                </h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={(ev) => this.setState({ nama: ev.target.value })} />

                                    Username
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.username}
                                        onChange={(ev) => this.setState({ username: ev.target.value })} />
                                    
                                    Role
                                    <select className="form-control mb-2"
                                        value={this.state.role}
                                        onChange={(ev) => this.setState({ role: ev.target.value })}>
                                        <option value="Admin">Admin</option>
                                    </select>

                                    <button className="btn btn-success" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        )

    }
}
export default Users