
import Footer from "../../footer/Footer"
import Header from "../../header/Header"
import { Outlet } from "react-router-dom"



const LayoutWithoutNavbar = () => {
    return (
      <>
    
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </>
    );
  };
  

export default LayoutWithoutNavbar


