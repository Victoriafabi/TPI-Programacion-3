import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'


const Footer = () => {
    return (
      <footer className="footer-seccion text-white">
      <div className="footer-contenido container d-flex justify-content-between align-items-start flex-wrap">
  
        <div className="footer-col d-flex flex-column align-items-center text-center">
          <img src="/logo.png" alt="Logo Victoria Fabi" className="footer-logo mb-3" />
        </div>
  
        <div className="linea-vertical mx-3"></div>
  
        <div className="footer-col text-center">
          <h5>Seguinos</h5>
          <div className="footer-redes">
            <a href="https://web.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="mailto: victoriafabi1987@gmail.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>
          </div>
        </div>
  
        <div className="linea-vertical mx-3"></div>
  
        <div className="footer-col text-end">
          <h5>Sucursales</h5>
          <ul className="list-unstyled mb-0">
            <li>
              📌 <a href= "https://maps.app.goo.gl/VwFyaoTNgJhhxMEk7" target="_blank" rel="noopener noreferrer" >Fisherton</a>
            </li>
            <li>
              📌 <a href="https://maps.app.goo.gl/vTrY7PB5Y37WbabE8" target="_blank" rel="noopener noreferrer" >Pichincha</a>
            </li>
            <li>
              📌 <a href="https://maps.app.goo.gl/hUsBhody4xaquCw19" target="_blank" rel="noopener noreferrer">Centro</a>
            </li>
          </ul>
        </div>
      </div>
  
      <div className="footer-derechos text-center py-3">
        &copy; {new Date().getFullYear()} Brindis Club - Todos los derechos reservados - Realizado con 💜 por Victoria Fabi
      </div>
    </footer>
  )
  }
  export default Footer