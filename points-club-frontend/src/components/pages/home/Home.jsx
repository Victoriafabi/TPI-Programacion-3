import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Banner from "../../common/banner/Banner";
import HeroSection from "../../pages/home/heroSection/HeroSection";
import About from "../../pages/home/about/About";
import TestimonialsSection from "../../pages/home/testimonials/Testimonials";
import NavBarHome from "./navBarHome/NavBarHome";

const Home = () => {
    useEffect(() => {
        toast.info("📱 Descargá la app de Brindis Club", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, []);

    return (
        <div>
            <NavBarHome />
            <Banner />
            <HeroSection />
            <About />
            <TestimonialsSection />
            <ToastContainer />
        </div>
    );
};

export default Home;
