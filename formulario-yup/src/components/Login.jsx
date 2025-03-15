import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Usamos useNavigate para redirigir
import * as Yup from 'yup';  
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const [isLocked, setIsLocked] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    validationSchema
      .validate({ email, password })
      .then(() => {
        if (email === 'user@gmail.com' && password === '123456') {
          setError('');
          navigate('/profile'); // Redirige al perfil cuando las credenciales son correctas
        } else {
          setAttempts(attempts + 1);
          if (attempts + 1 >= 3) {
            setIsLocked(true);
            setError('Demasiados intentos fallidos. Intenta más tarde.');
          } else {
            setError('Credenciales incorrectas.');
          }
        }
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {isLocked && <Alert variant="danger">{error}</Alert>}
      {!isLocked && error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu correo"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLocked}>
          Iniciar sesión
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;