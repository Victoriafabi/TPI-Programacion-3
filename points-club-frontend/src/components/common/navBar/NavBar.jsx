import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
    return (
      <nav className="navbar shadow" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="Logo" className="logo" />
          <div>
            <h4 className="m-0">Bienvenido!</h4>
            {/* <span>{user?.nombre || "Usuario"}</span> */}
          </div>
        </div>
  
       
        <ul className="nav nav-pills mb-0">
          <li className="nav-item">
            <Link to="/RewardsClientes" className="nav-link">
              Premios
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/MyPoints" className="nav-link">
              Mis puntos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/MyExChanges" className="nav-link">
              Mis canjes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              Sucursales
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;