import { useState } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteUser = ({ userId, user, onDeleted }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!user) {
      toast.warn("No hay usuario para eliminar.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("No se pudo eliminar el usuario.");
      } else {
        toast.success("Usuario eliminado con éxito");
        onDeleted && onDeleted();
      }
    } catch {
      toast.error("Error al eliminar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-fondo">
      <Card className="form-card bg-transparent border-0" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          {user ? (
            <>
              <p><strong>Nombre:</strong> {user.nombre}</p>
              <p><strong>Apellido:</strong> {user.apellido}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.rol}</p>
              <button disabled={loading} onClick={handleDelete} className="secundary">
                {loading ? "Eliminando..." : "Eliminar"}
              </button>
            </>
          ) : (
            <p>No hay usuario seleccionado</p>
          )}
        </Card.Body>
      </Card>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default DeleteUser;
