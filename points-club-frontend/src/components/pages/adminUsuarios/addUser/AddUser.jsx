import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rol, setRol] = useState("usuario");

  const rolesDisponibles = ["usuario", "admin", "superadmin"];
  const navigate = useNavigate();

  const validatePassword = () => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{8,}$/;
    return regex.test(password);
  };

  const [aceptaTerminos, setAceptaTerminos] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!aceptaTerminos) {
      toast.error("Debe aceptar los términos y condiciones para continuar.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    if (!validatePassword()) {
      toast.error("La contraseña no cumple con los requisitos.");
      return;
    }

    if (!nombre || !apellido || !email || !password) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor ingrese un email válido.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, email, password, rol }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al registrar el usuario");
        return;
      }

      toast.success("Registro exitoso. Redirigiendo a la lista de usuarios..");
      setTimeout(() => {
        navigate("/AdminUsuarios");
      }, 2000);
    } catch (err) {
      toast.error("Error de red al registrar el usuario");
      console.error(err);
    }
  };


  return (
    <div className="form-fondo">
      <Card className="form-card bg-transparent border-0" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <Row className="mb-3">
            <h5 className="text-center">Agregar usuario</h5>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                {rolesDisponibles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle ms-2"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </Button>
              </div>
              <Form.Text className="text-muted">
                La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant="link"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle ms-2"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Acepto los términos y condiciones"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                required
              />
            </Form.Group>


            <Row className="mb-3">
              <Col className="d-flex justify-content-end">
                <Button variant="secondary" type="submit">
                  Registrar
                </Button>
              </Col>
            </Row>
          </Form>

          <Row>
            <Col className="text-center">
              <Button variant="link" onClick={() => navigate("/Products")}>
                ← Volver al menu
              </Button>
            </Col>
          </Row>
          {rol === "superadmin" && (
            <Row className="mt-2">
              <Col className="text-center">
                <Button variant="outline-primary" onClick={() => navigate("/Products")}>
                  Ir a Productos
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
 <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
}
