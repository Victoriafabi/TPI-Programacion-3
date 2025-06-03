import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useAuth } from "../../../hooks/useAuth";
import { validateEmail, validatePassword } from "../../utils/validation.js"


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Por favor, ingresá un email válido");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("La contraseña es inválida");
      return;
    }

    setLoading(true);
    const loadingToastId = toast.info("Iniciando sesión...", {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      toast.dismiss(loadingToastId);
      setLoading(false);

      if (!res.ok) {
        toast.error(data.error || "Credenciales inválidas");
        return;
      }

      if (data.token && data.user) {
        toast.success("¡Sesión iniciada correctamente!");
        login(data.user, data.token);
        navigate("/Products");
      } else {
        toast.error("Datos de usuario o token no válidos");
      }
    } catch (err) {
      toast.dismiss(loadingToastId);
      setLoading(false);
      console.error(err);
      toast.error("Error de red al iniciar sesión");
    }
  };

  return (
    <div className="login-fondo">
      <Card className="login-card bg-transparent border-0" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <Row className="mb-3">
            <h5 className="text-center">Iniciar sesión</h5>
          </Row>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <Form.Control
                type="email"
                required
                placeholder="Ingresar email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </FormGroup>
            <FormGroup className="mb-4 position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                required
                placeholder="Ingresar contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <Button
                variant="link"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle ms-2 position-absolute end-0 top-50 translate-middle-y"
                style={{ zIndex: 1 }}
                disabled={loading}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </Button>
            </FormGroup>
            <Row className="mb-3">
              <Col className="d-flex justify-content-end">
                <Button variant="secondary" type="submit" disabled={loading}>
                  {loading ? "Cargando..." : "Iniciar sesión"}
                </Button>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col className="text-center">
              <Button variant="link" onClick={() => navigate("/")} disabled={loading}>
                ← Volver al inicio
              </Button>
            </Col>
          </Row>
          <Row className="flex-column">
            <Col className="text-center mb-2">
              <span>
                ¿No estás registrada?{" "}
                <span
                  style={{
                    color: "#0d6efd",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/Register")}
                >
                  Registrate aquí
                </span>
              </span>
            </Col>
            <Col className="text-center mb-2">
              <span>
                ¿Olvidaste tu contraseña?{" "}
                <span
                  style={{
                    color: "#0d6efd",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/RecoverPassword")}
                >
                  Presiona aquí
                </span>
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
}
