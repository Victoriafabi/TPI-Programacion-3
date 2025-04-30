import React from "react";
import './HeroSection.css'

const HeroSection = () => {
    return (
      <section className="info-section py-5 text-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-md-start mb-4 mb-md-0">
                <h2 className="display-5 mb-3">¿Cómo funciona?</h2>
                <p className="lead">
                  <span className="badge-nro">1</span> Registrate en nuestro programa de puntos. <br />
                  <span className="badge-nro">2</span> Comprá en nuestros locales y acumulá puntos. <br />
                  <span className="badge-nro">3</span> Consultá tu saldo de puntos y canjealos por productos o descuentos. <br />
                  <span className="badge-nro">4</span> ¡Disfrutá de tus recompensas! 🎁
                </p>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <div className="posicion-imagen position-relative">
                  <div className="fondo-color"></div>
                  <img
                    src="https://images.unsplash.com/photo-1544776527-68e63addedf7"
                    alt="Beneficios del programa"
                    className="img-fluid position-relative shadow rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  };
  
  
  export default HeroSection