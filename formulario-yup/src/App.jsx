import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import LoginForm from './components/Login';
import Perfil from './components/Perfil';
import './App.css';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Form />} /> 
        <Route path="/profile" element={<Perfil />} /> 
        <Route path="/login" element={<LoginForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;