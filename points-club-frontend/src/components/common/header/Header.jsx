import React from "react";
import './Header.css'

const Header = () => {
    return (
      <div className="header d-flex align-items-center justify-content-center">
        <div className="contenido-header d-flex w-100 justify-content-between align-items-center text-white text-center text-md-start">
          
          <div className="columna-logo d-flex align-items-center">
            <img  src="/logo.png" alt="Logo Brindis Club" className="logo-header me-3" />
            <div className="linea-vertical"></div>
          </div>
  
          <div className="columna-texto text-center px-3">
            <h1 className="fw-bold">¡Bienvenidos a Club de puntos Brindis!</h1>
            <p>Sumá puntos, canjeá premios y viví la experiencia Brindis</p>
          </div>
  
          <div className="columna-redes d-flex align-items-center justify-content-center">
            <div className="linea-vertical me-3"></div>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <i className="bi bi-instagram fs-1"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <i className="bi bi-facebook fs-1"></i>
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;