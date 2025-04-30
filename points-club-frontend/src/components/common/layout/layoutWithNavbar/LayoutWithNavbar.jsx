import React from "react";
import Header from "../../header/Header"
import Footer from "../../footer/Footer"
import { Outlet } from "react-router-dom"
import NavBar from "../../navBar/NavBar"


const LayoutWithNavBar = () => (
    <>
    <Header />
    <NavBar />
    <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
);

export default LayoutWithNavBar