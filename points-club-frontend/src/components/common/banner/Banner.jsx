import React from 'react'
import { Link } from 'react-router-dom'
import './Banner.css'; 


const Banner = () => {
    return (
      <>
        <div className="banner-container">
          <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://plus.unsplash.com/premium_photo-1682097091093-dd18b37764a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="d-block w-100 hero-img"
                  alt="Dos copas de vino tinto brindando"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1663616333378-c579c7ee9be0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="d-block w-100 hero-img"
                  alt="Persona sirviendo vino blanco en una copa durante una comida con flores en la mesa"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1675668410450-7008c2e02c01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="d-block w-100 hero-img"
                  alt="Fila de botellas de vino tinto sobre un estante de madera"
                />
              </div>
            </div>
          </div>
  
          <div className="banner-overlay"></div>
  
          <div className="hero-content text-center text-white">
            <h3 className="mb-4">¡Empezá a sumar hoy!</h3>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register" className="btn-violet">Registrate</Link>
              <Link to="/login" className="btn-violet">Iniciar sesión</Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Banner;