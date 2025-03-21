import React, { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Button, Alert } from 'react-bootstrap';
import { UserContext } from './UserContext'; 
import "../styles/Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
    password: Yup.string().min(4, 'La contraseña debe tener al menos 4 caracteres').required('La contraseña es obligatoria')
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema.validate({ email, password }).then(() => {
      if (loginUser(email, password)) {
        setError('');
        alert("Inicio de sesión exitoso.");
        navigate('/profile');
      } else {
        setAttempts(attempts + 1);
        if (attempts + 1 >= 3) {
          setIsLocked(true);
          setError('Demasiados intentos fallidos. Intenta más tarde.');
        } else {
          setError('Credenciales incorrectas.');
        }
      }
    }).catch(err => {
      setError(err.message);
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar sesión</h2>
        {isLocked && <Alert variant="danger">{error}</Alert>}
        {!isLocked && error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} className="login-form">

          <Form.Group controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo"
              className="login-input"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              className="login-input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLocked} className="login-button">
            Iniciar sesión
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;