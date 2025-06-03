import React, { useEffect} from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'
import './About.css'


const About = () => {
    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
  
    return (
        <section id="about" className="container-fluid custom-bg py-5">
        <div className="row align-items-stretch">

          <div className="col-12 col-md-6" data-aos="fade-right">
            <img
              src="vino.jpg"
              alt="Dos hombres que sostienen copas de vino tinto y brindan frente a dos grandes toneles de madera en una bodega"
              className="img-fluid w-100 h-100 object-fit-cover"
            />
          </div>

          <div
            className="col-12 col-md-6 text-center text-md-start px-4 texto-con-fondo"
            data-aos="fade-left"
          >
            <p className='aboutUs-text'>
              Somos una vinoteca familiar con más de 20 años de historia, ubicada en el corazón de Rosario. Desde nuestros inicios, nos ha acompañado la pasión por el vino, compartiendo con nuestros clientes una experiencia única en cada botella. A lo largo de estos años, hemos crecido y nos hemos establecido con tres sucursales, cada una de ellas un lugar especial donde los amantes del vino pueden descubrir etiquetas cuidadosamente seleccionadas.
  
              Nos especializamos en vinos de bodegas locales y nacionales, apostando siempre por aquellos que respetan la tradición y la calidad. Nuestra misión es ofrecer un espacio donde se valore el vino como un arte, invitando a nuestros clientes a conocer y disfrutar de una amplia variedad de etiquetas, desde las más tradicionales hasta las más innovadoras.
  
              En cada sucursal, nos aseguramos de que el ambiente sea cálido y acogedor, ideal para que cada persona se sienta parte de nuestra familia vinícola. Además, contamos con asesores expertos que acompañan a cada cliente en su búsqueda, brindando recomendaciones personalizadas según sus gustos y preferencias.
  
              En nuestra vinoteca, no solo vendemos vino, sino que también buscamos educar, compartir y disfrutar con nuestros clientes de cada copa. Nos enorgullece ser un lugar de encuentro para quienes buscan más que solo una compra, sino una experiencia que celebre la pasión por el vino.
            </p>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default About