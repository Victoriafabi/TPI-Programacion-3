import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSearch from "./userSherch/UserSearch";
import UsuariosTable from "../usuariosTable/UsuariosTable";
import { useAuth } from "../../../hooks/useAuth";
import { isTokenValid } from "../../utils/validation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token || !isTokenValid(token)) {
        console.log("Token no válido o expirado al cargar usuarios.");
        await logout();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.error("Token expirado o inválido (respuesta API al cargar usuarios). Cerrando sesión.");
            await logout();
            navigate("/login");
            return;
          }
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
         toast.error("Hubo un error al cargar los usuarios.");
      }
    };

    fetchUsers();
  }, [navigate, logout]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    if (query) {
      const filtered = users.filter((user) =>
        user.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/ModifyUser/${userId}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token || !isTokenValid(token)) {
      console.log("Token no válido o expirado al intentar eliminar usuario.");
      await logout();
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error("Token expirado o inválido (respuesta API al eliminar usuario). Cerrando sesión.");
          await logout();
          navigate("/login");
          return;
        }
         toast.error("No se pudo eliminar el usuario.");
        return;
      }

      setUsers((prev) => prev.filter((user) => user.id !== id));
      setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Hubo un error al eliminar el usuario:", error);
      toast.error("Hubo un problema al eliminar el producto.");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredUsers(users);
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <UserSearch onSearch={handleSearch} searchTerm={searchTerm} />
        <button onClick={handleClearSearch}>Limpiar búsqueda</button>
      </div>
      <UsuariosTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default AdminUsuarios;
