import Banner from "../../common/banner/Banner"
import HeroSection from "../../pages/home/heroSection/HeroSection"
import About from "../../pages/home/about/About"
import TestimonialsSection from "../../pages/home/testimonials/Testimonials"

const Home = () => {
    return (
        <div>
            <Banner />
            <HeroSection />
            <About />
            <TestimonialsSection />
        </div>
    );
};

export default Home;