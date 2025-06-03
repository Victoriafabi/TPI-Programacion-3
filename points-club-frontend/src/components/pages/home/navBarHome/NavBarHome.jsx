import { Link } from 'react-router-dom';


const NavBarHome = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
      <div className="container">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="./register" className="nav-link">Registrate</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            </li>
            <li className="nav-item">
               <a href="#banner" className="nav-link">Como Funciona</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">Sobre Nosotros</a>
            </li>
            <li className="nav-item">
              <a href="#testimonios" className="nav-link">Testimonios</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBarHome;
