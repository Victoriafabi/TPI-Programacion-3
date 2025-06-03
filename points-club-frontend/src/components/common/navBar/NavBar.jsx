import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./Navbar.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    toast.success("Sesión cerrada correctamente");
  await logout();
  navigate("/login");
};

  let saludo = `¡Hola, ${user?.nombre || "Usuario"}!`;
  if (user?.rol === "admin") {
    saludo = `¡Hola, Admin ${user.nombre}!`;
  } else if (user?.rol === "superadmin") {
    saludo = `¡Hola, SuperAdmin ${user.nombre}!`;
  }

  return (
    <>
      <nav className="navbar shadow d-flex justify-content-between align-items-center" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, padding: "0 1rem" }}>
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="Logo de Brindis Club: dos copas brindando" className="logo" />
          <div>
            <h4 className="m-0">{saludo}</h4>
          </div>
        </div>

        {/* Menú */}
        <ul className="nav nav-pills mb-0">
          <li className="nav-item"><Link to="/Products" className="nav-link">Premios</Link></li>
          <li className="nav-item"><Link to="/UserPoints" className="nav-link">Mis puntos</Link></li>
          <li className="nav-item"><Link to="/UserPoints" className="nav-link">Mis canjes</Link></li>
          <li className="nav-item"><Link to="/Branches" className="nav-link">Sucursales</Link></li>

          {(user?.rol === "admin" || user?.rol === "superadmin") && (
            <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdownProductos" role="button" data-bs-toggle="dropdown" aria-expanded="false">Administrar Productos</Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownProductos">
                <li><Link to="/AddProduct" className="dropdown-item">Agregar</Link></li>
                <li><Link to="/AdminProducts" className="dropdown-item">Editar / Eliminar</Link></li>
              </ul>
            </li>
          )}

          {user?.rol === "superadmin" && (
            <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdownUsuarios" role="button" data-bs-toggle="dropdown" aria-expanded="false">Administrar Usuarios</Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownUsuarios">
                <li><Link to="/AddUser" className="dropdown-item">Agregar</Link></li>
                <li><Link to="/AdminUsuarios" className="dropdown-item">Editar / Eliminar</Link></li>
              </ul>
            </li>
          )}

          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link btn btn-link" style={{ cursor: "pointer" }}>
              Cerrar sesión
            </button>
          </li>
        </ul>

        <a
          href="https://wa.me/5493416111234"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-icon"
          title="Contactanos por WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </nav>
      
    </>
  );
};

export default Navbar;

