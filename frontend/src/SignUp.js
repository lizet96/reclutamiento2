import React from "react";

function SignUpForm({ onRegister }) {
  const [state, setState] = React.useState({
    nombre: "",
    correo: "",
    password: "",
    fechaNacimiento: "",
    telefono: "", 
  });
  
  const [error, setError] = React.useState(""); // Estado para manejar errores

  const handleChange = (evt) => {
    const { name, value } = evt.target; // Usa destructuración para obtener 'name' y 'value'
    setState({
      ...state,
      [name]: value // Actualiza el estado basado en el nombre del campo
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { nombre, correo, password, fechaNacimiento, telefono } = state;

    try {
      await onRegister(nombre, correo, password, fechaNacimiento, telefono); // Llamar a la función onRegister
      setState({
        nombre: "",
        correo: "",
        password: "",
        fechaNacimiento: "",
        telefono: "", 
      });
      setError(""); // Limpiar el mensaje de error al registrarse con éxito
    } catch (error) {
      console.error("Error al registrarse:", error);
      setError("Error durante el registro. Intenta nuevamente."); // Establecer mensaje de error
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Crea tu cuenta</h1>
        <span>Usa tu correo para registrarte</span>
        {error && <p className="error-message">{error}</p>} {/* Mostrar el mensaje de error */}
        <input
          type="text"
          name="nombre"
          value={state.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email" // Cambiado a 'email'
          name="correo"
          value={state.correo}
          onChange={handleChange}
          placeholder="Correo"
          required
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={state.fechaNacimiento}
          onChange={handleChange}
          placeholder="Fecha de nacimiento"
          required
        />
        <input
          type="tel"
          name="telefono"
          value={state.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default SignUpForm;
