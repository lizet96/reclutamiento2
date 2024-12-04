import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignInForm from "./componentes/SignIn";
import SignUpForm from "./componentes/SignUp";

const AppRoutes = ({ user, onLogin, onRegister, type, setType, error, handleOnClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Manejar el inicio de sesión
  const handleLogin = (userData) => {
    onLogin(userData);
    setIsLoggedIn(true); // Usuario autenticado
  };

  return (
    <Routes>
      {/* Ruta raíz redirige según estado de autenticación */}
      <Route path="/" element={<Navigate to={isLoggedIn ? "/vacantes" : "/auth"} replace />} />

      {/* Rutas de autenticación */}
      <Route
        path="/auth"
        element={
          <div
            className={`container ${type === "signUp" ? "right-panel-active" : ""}`}
            id="container"
          >
            <SignUpForm onRegister={onRegister} />
            <SignInForm onLogin={handleLogin} error={error} />
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>¡Bienvenido!</h1>
                  <p>Inicia sesión con tu información personal para continuar.</p>
                  <button
                    className="ghost"
                    id="signIn"
                    onClick={() => handleOnClick("signIn")}
                  >
                    Iniciar sesión
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>¿Aún no tienes cuenta?</h1>
                  <p>Regístrate y comienza un viaje con nosotros.</p>
                  <button
                    className="ghost"
                    id="signUp"
                    onClick={() => handleOnClick("signUp")}
                  >
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
