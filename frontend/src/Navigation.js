import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InicioSesion from './vistas/inicioSesion';
import Registro from './vistas/Registro';

export default function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        {/* Redirige a /login por defecto */}
        <Route path="/" element={<Navigate to="/InicioSesion" replace />} />
      </Routes>
    </Router>
  );
}
