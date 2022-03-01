import React from "react";
import NotFound from "./NotFound";
import Member from "./pages/Member";
import Footer from "./footer";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Paket from "./pages/Paket";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import Transaksi from "./pages/Transaksi";
import FormTransaksi from "./pages/FormTransaksi";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar><Dashboard /></Navbar>} />
        <Route path='/Member' element={<Navbar><Member /></Navbar>} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Users' element={<Navbar><Users /></Navbar>} />
        <Route path='/Paket' element={<Navbar><Paket /></Navbar>} />
        <Route path='/Transaksi' element={<Navbar><Transaksi /></Navbar>} />
        <Route path='/FormTransaksi' element={<Navbar><FormTransaksi /></Navbar>} />

        <Route component={NotFound} />
      </Routes>
      <Footer />
    </BrowserRouter>


  )
}