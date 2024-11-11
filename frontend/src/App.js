import React, { useState } from "react";
import "./Styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { jwtDecode } from "jwt-decode";
import Perfil from "./vistas/Perfil";

export default function App() {
  const [type, setType] = useState("signIn");
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(""); 
  const [view, setView] = useState("auth");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      setError(""); 
    }
  };

  const handleLogin = async (correo, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ correo, password }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al iniciar sesión");
      }

      const { message, token } = await response.json();
      console.log(message);
      localStorage.setItem("token", token);

      setUser(jwtDecode(token));
      setView("perfil"); // Cambia a la vista de perfil al iniciar sesión
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      setError(error.message);
    }
  };

  const handleRegister = async (name, email, password, fechaNacimiento, telefono) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, fechaNacimiento, telefono }), 
      });
  
      if (!response.ok) throw new Error("Error al registrarse");
  
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      setType("signIn");
    } catch (error) {
      setError(error.message);
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      {/* Hacer clic en el título "Reclutamiento Inteligente" cambia la vista a perfil */}
      <h2 onClick={() => setView("perfil")} style={{ cursor: "pointer" }}>
        Reclutamiento Inteligente
      </h2>

      {view === "auth" ? (
        <div className={containerClass} id="container">
          <SignUpForm onRegister={handleRegister} />
          <SignInForm onLogin={handleLogin} error={error} /> 
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Bienvenido!</h1>
                <p>
                  Para mantenerse conectado con nosotros, inicie sesión con su información personal
                </p>
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
                <p>Ingresa tus datos personales y comienza un viaje con nosotros</p>
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
      ) : (
        <Perfil user={user} /> 
      )}
    </div>
  );
}
