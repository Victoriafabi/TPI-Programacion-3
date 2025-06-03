import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../../hooks/useAuth";
const ModifyProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth(); 

  const [product, setProduct] = useState(null);
  const [newNombre, setNewNombre] = useState("");
  const [newDescripcion, setNewDescripcion] = useState("");
  const [newPuntosRequeridos, setNewPuntosRequeridos] = useState("");
  const [newImagen, setNewImagen] = useState("");
  const [newStock, setNewStock] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setNewNombre(data.nombre);
          setNewDescripcion(data.descripcion);
          setNewPuntosRequeridos(data.puntosRequeridos);
          setNewImagen(data.imagen);
          setNewStock(data.stock);
        } else {
          toast.error("Producto no encontrado.");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Hubo un error al buscar el producto.");
      }
    };

    fetchProduct();
  }, [id, token]);  

  const handleModify = async () => {
    if (!newNombre || !newDescripcion || !newPuntosRequeridos || !newImagen || !newStock) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
        body: JSON.stringify({
          nombre: newNombre,
          descripcion: newDescripcion,
          puntosRequeridos: parseInt(newPuntosRequeridos, 10),
          imagen: newImagen,
          stock: parseInt(newStock, 10),
        }),
      });

      if (!res.ok) {
        toast.error("Error al modificar el producto.");
        return;
      }

      toast.success("Producto modificado con éxito");

      setTimeout(() => {
        navigate("/AdminProducts");
      }, 2000);
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Hubo un error al modificar el producto.");
    }
  };

  const handleGoBack = () => {
    navigate("/AdminProducts");
  };

  return (
    <div className="form-fondo">
      <Card className="form-card bg-transparent border-0 p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <h5 className="text-center mb-3">Modificar Producto</h5>

          {product && (
            <div className="mt-3">
              <div className="mb-2">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  placeholder="Nuevo nombre"
                />
              </div>
              <div className="mb-2">
                <label>Descripción:</label>
                <textarea
                  className="form-control"
                  value={newDescripcion}
                  onChange={(e) => setNewDescripcion(e.target.value)}
                  placeholder="Nueva descripción"
                />
              </div>
              <div className="mb-2">
                <label>Puntos Requeridos:</label>
                <input
                  type="number"
                  className="form-control"
                  value={newPuntosRequeridos}
                  onChange={(e) => setNewPuntosRequeridos(e.target.value)}
                  placeholder="Puntos requeridos"
                />
              </div>
              <div className="mb-2">
                <label>Imagen URL:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newImagen}
                  onChange={(e) => setNewImagen(e.target.value)}
                  placeholder="URL de imagen"
                />
              </div>
              <div className="mb-3">
                <label>Stock:</label>
                <input
                  type="number"
                  className="form-control"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  placeholder="Stock"
                />
              </div>
              <button onClick={handleModify} className="secundary">Modificar</button>
              <button onClick={handleGoBack} className="secundary" style={{ marginLeft: "10px" }}>
                Volver a la lista
              </button>
            </div>
          )}
        </Card.Body>
      </Card>

      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default ModifyProduct;
