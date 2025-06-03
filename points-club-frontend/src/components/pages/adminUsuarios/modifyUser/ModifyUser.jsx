import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModifyUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [newNombre, setNewNombre] = useState("");
  const [newApellido, setNewApellido] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRol, setNewRol] = useState("");
  const [newPuntos, setNewPuntos] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setNewNombre(data.nombre);
          setNewApellido(data.apellido);
          setNewEmail(data.email);
          setNewRol(data.rol);
          setNewPuntos(data.puntos);
        } else {
          toast.error("Usuario no encontrado.");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        toast.error("Hubo un error al buscar el usuario.");
      }
    };

    fetchUser();
  }, [id]);

  const handleModify = async () => {
    if (!newNombre || !newApellido || !newEmail || !newRol || newPuntos === "") {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: newNombre,
          apellido: newApellido,
          email: newEmail,
          rol: newRol,
          puntos: parseInt(newPuntos, 10),
        }),
      });

      toast.success("Usuario modificado con éxito");

      setTimeout(() => {
        navigate("/AdminUsuarios");
      }, 2000);
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Hubo un error al modificar el usuario.");
    }
  };

  const handleGoBack = () => {
    navigate("/AdminUsuarios");
  };

  return (
    <div className="form-fondo">
      <Card className="form-card bg-transparent border-0 p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <h5 className="text-center mb-3">Modificar usuario</h5>

          {user && (
            <div>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  value={newApellido}
                  onChange={(e) => setNewApellido(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <input
                  type="text"
                  className="form-control"
                  value={newRol}
                  onChange={(e) => setNewRol(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Puntos</label>
                <input
                  type="number"
                  className="form-control"
                  value={newPuntos}
                  onChange={(e) => setNewPuntos(e.target.value)}
                />
              </div>

              <button onClick={handleModify} className="btn btn-secondary">
                Modificar
              </button>
              <button onClick={handleGoBack} className="btn btn-secondary ms-2">
                Volver
              </button>
            </div>
          )}
        </Card.Body>
      </Card>

      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default ModifyUser;
