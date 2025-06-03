import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./register.css";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rol] = useState("usuario");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const mostrarError = (mensaje) => {
    setError(mensaje);
    setSuccess("");
  };

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!aceptaTerminos) return mostrarError("Debe aceptar los términos y condiciones para continuar.");

    if (![nombre, apellido, email, password, confirmPassword].every(Boolean)) {
      return mostrarError("Por favor, complete todos los campos.");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return mostrarError("Por favor ingrese un email válido.");
    }

    if (password !== confirmPassword) {
      return mostrarError("Las contraseñas no coinciden.");
    }

    if (!validatePassword(password)) {
      return mostrarError("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
    }

    // Envío
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, email, password, rol }),
      });

      const data = await res.json();

      if (!res.ok) {
        return mostrarError(data.error || "Error al registrar el usuario");
      }

      setSuccess("Registro exitoso. Redirigiendo al inicio de sesión...");
      setError("");

      setNombre("");
      setApellido("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAceptaTerminos(false);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      mostrarError("Error de red al registrar el usuario");
      console.error("Detalles del error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-fondo">
      <Card className="form-card bg-transparent border-0" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <Row className="mb-3">
            <h5 className="text-center">Registrarse</h5>
          </Row>
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showPassword ? "text" : "password"}
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
                  placeholder="Repetir contraseña"
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
              />
            </Form.Group>

            <Row className="mb-3">
              <Col className="d-flex justify-content-end">
                <Button variant="secondary" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Registrarse"}
                </Button>
              </Col>
            </Row>
          </Form>

          <Row>
            <Col className="text-center">
              <Button variant="link" onClick={() => navigate("/")}>
                ← Volver al inicio
              </Button>
            </Col>
          </Row>

          <Row>
            <Col className="text-center">
              <span>
                ¿Ya estás registrado?{" "}
                <span
                  style={{ color: "#0d6efd", textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Iniciá sesión aquí
                </span>
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
