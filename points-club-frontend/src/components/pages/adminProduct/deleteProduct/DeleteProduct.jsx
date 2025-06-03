import { useState } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteProduct = ({ productId, product, onDeleted }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!product) {
      toast.warn("No hay producto para eliminar.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("No se pudo eliminar el producto.");
      } else {
        toast.success("Producto eliminado con éxito");
        onDeleted && onDeleted();  // el padre actualiza si quiere
      }
    } catch {
      toast.error("Error al eliminar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-fondo">
      <Card className="form-card bg-transparent border-0" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          {product ? (
            <>
              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Nombre:</strong> {product.nombre}</p>
              <p><strong>Descripción:</strong> {product.descripcion}</p>
              <p><strong>Puntos Requeridos:</strong> {product.puntosRequeridos}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <button disabled={loading} onClick={handleDelete} className="secundary">
                {loading ? "Eliminando..." : "Eliminar"}
              </button>
            </>
          ) : (
            <p>No hay producto seleccionado</p>
          )}
        </Card.Body>
      </Card>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default DeleteProduct;
