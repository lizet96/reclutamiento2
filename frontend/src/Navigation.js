// Navigation.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignInForm from "./componentes/SignIn";
import SignUpForm from "./componentes/SignUp";
import Perfil from "./vistas/Perfil";
import Vacantes from "./vistas/vacantes";
import AgregarVacante from "./vistas/agregarVacante";
import Resultados from "./vistas/Resultados";
import Postulantes from "./vistas/Postulantes"
import Formularios from "./vistas/Formularios";
import Cuestionario from "./vistas/Cuestionario";
export default function Navigation({ user }) {
  const isLoggedIn = user !== null; // Se asume que `user` es el objeto del usuario autenticado

  return (
    <Routes>
      {/* Redirección desde la raíz */}
      <Route
  path="/"
  element={<Navigate to={isLoggedIn ? "/inicioSesion" : "/dashboard"} replace />}
/>

      {/* Rutas públicas */}
      <Route path="/inicioSesion" element={isLoggedIn ? <Navigate to="/vacantes" replace /> : <SignInForm />} />
      <Route path="/registro" element={isLoggedIn ? <Navigate to="/vacantes" replace /> : <SignUpForm />} />

      {/* Rutas protegidas */}
      {isLoggedIn ? (
        <>
          <Route path="/perfil" element={<Perfil user={user} />} />
          <Route path="/vacantes" element={<Vacantes user={user} />} />
          <Route path="/agregarVacante" element={<AgregarVacante user={user}/>} />
          <Route path="/resultados" element={<Resultados user={user}/>} />
          <Route path="/Postulantes" element={<Postulantes user={user}/>} />
          <Route path="/formularios/:vacante_id" element={<Formularios to="/Formularios" />} />
          <Route path="/cuestionario/:id_formulario" element={<Cuestionario />} />

        </>
      ) : (
        <Route path="*" element={<Navigate to="/inicioSesion" replace />} />
      )}
    </Routes>
  );
}
