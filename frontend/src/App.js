import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation"; // Importa tu componente de rutas centralizado
import Auth from "./componentes/Auth"; // Componente de autenticación
import "./Styles.css";
import { jwtDecode } from "jwt-decode";
import "font-awesome/css/font-awesome.min.css";


export default function App() {
  const [type, setType] = useState("signIn");
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(""); 

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      setError(""); 
    }
  };

  const handleLogin = async (correo, password) => {
    try {
      const response = await fetch("https://rrhbackend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al iniciar sesión");
        return;
      }

      const { message, token } = await response.json();
      console.log(message);
      localStorage.setItem("token", token);

      // Decodifica el token y extrae los datos del usuario
      const decodedUser = jwtDecode(token);
      console.log(decodedUser);
      setUser(decodedUser);
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      setError("Error inesperado al iniciar sesión");
    }
  };

  const handleRegister = async (name, email, password, fechaNacimiento, telefono) => {
    try {
      const response = await fetch("https://rrhbackend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, fechaNacimiento, telefono }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "El correo ya existe, intenta con otro");
      }

      alert("Registro exitoso, verifica tu correo para poder iniciar sesión.");
      setType("signIn");
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        {!user ? (
          // Mostrar el componente de autenticación si el usuario no ha iniciado sesión
          <Auth
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            error={error}
            type={type}
            handleOnClick={handleOnClick}
          />
        ) : (
          // Mostrar la navegación si el usuario ha iniciado sesión
          <Navigation />
        )}
      </div>
    </BrowserRouter>
  );
}
