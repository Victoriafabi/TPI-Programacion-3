import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../../../context/AuthenticationContext";


const AddProduct = () => {
  const { token } = useContext(AuthenticationContext);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [puntosRequeridos, setPuntosRequeridos] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState(10);

  const handleAdd = async (event) => {
    event.preventDefault(); 

    if (!nombre || !descripcion || !puntosRequeridos || !imagen) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: nombre,
          descripcion: descripcion,
          puntosRequeridos: puntosRequeridos,
          imagen: imagen,
          stock: stock,
        }),
      });

      if (!res.ok) {
        toast.error("Hubo un error al agregar el producto.");
        return;
      }

      toast.success("Producto agregado con éxito");

      setNombre("");
      setDescripcion("");
      setPuntosRequeridos("");
      setImagen("");
      setStock(10);
    } catch (error) {
      toast.error("Error al agregar el producto.");
      console.error(error);
    }
  };

  return (
    <div className="form-fondo">
      <Card className="form-card bg-transparent border-0" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <Row className="mb-3">
            <h5 className="text-center">Agregar Producto</h5>
          </Row>

          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                required
                placeholder="Descripción del producto"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                required
                placeholder="Puntos requeridos"
                value={puntosRequeridos}
                onChange={(e) => setPuntosRequeridos(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="URL de la imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="number"
                required
                placeholder="Stock del producto"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col className="d-flex justify-content-end">
                <Button variant="secondary" type="submit">
                  Agregar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
}

export default AddProduct;
