import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignInForm from "./componentes/SignIn";
import SignUpForm from "./componentes/SignUp";
import Perfil from "./vistas/Perfil";
import Vacantes from "./vistas/vacantes";
import AgregarVacante from "./vistas/agregarVacante";

export default function Navigation() {
  const isLoggedIn = true; // Cambia esto según el estado de autenticación real

  return (
    <Routes>
      {/* Redirección desde la raíz */}
      <Route path="/" element={<Navigate to={isLoggedIn ? "/vacantes" : "/inicioSesion"} replace />} />

      {/* Rutas públicas */}
      <Route path="/inicioSesion" element={isLoggedIn ? <Navigate to="/vacantes" replace /> : <SignInForm />} />
      <Route path="/registro" element={isLoggedIn ? <Navigate to="/vacantes" replace /> : <SignUpForm />} />

      {/* Rutas protegidas */}
      {isLoggedIn ? (
        <>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/vacantes" element={<Vacantes />} />
          <Route path="/agregarVacante" element={<AgregarVacante />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/inicioSesion" replace />} />
      )}
    </Routes>
  );
}
