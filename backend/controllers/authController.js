const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Asegúrate de que esta ruta sea correcta

const USER_TYPES = {
  ADMIN: 'admin',
  CLIENT: 'cliente',
};

const registerUser = async (req, res) => {
    const { name, email, password, fechaNacimiento, telefono } = req.body;
  
    // Verificar que se reciban todos los datos necesarios
    if (!name || !email || !password || !fechaNacimiento || !telefono) {
      return res.status(400).json({ error: "Datos inválidos" });
    }
  
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Obtener una conexión del pool
    const connection = await db.promise().getConnection(); // Usa el método promesa
  
    try {
      // Iniciar transacción
      await connection.beginTransaction();
  
      try {
        // Registrar al usuario
        const [userResult] = await connection.execute(
          'INSERT INTO usuario (us_nombre,us_correo, us_contrasena, rol) VALUES (?,?, ?, ?)',
          [name,email, hashedPassword, USER_TYPES.CLIENT]
        );
  
        const userId = userResult.insertId; // Obtener el ID del nuevo usuario
  
        // Registrar en la tabla candidatos
        await connection.execute(
          'INSERT INTO candidatos (fechaNacimiento, telefono, id_usuario) VALUES (?, ?, ?)',
          [fechaNacimiento, telefono, userId]
        );
  
        // Confirmar la transacción
        await connection.commit();
        res.status(201).json({ message: "Usuario registrado correctamente" });
  
      } catch (error) {
        // Si hay un error, hacer rollback y mostrar el error
        await connection.rollback();
        console.error("Error durante la transacción:", error); // Detalle del error
        res.status(500).json({ error: "Error en la transacción", details: error.message });
      }
    } catch (error) {
      console.error("Error al iniciar la transacción:", error); // Detalle del error
      res.status(500).json({ error: "Error al procesar la solicitud" });
    } finally {
      // Liberar la conexión
      if (connection) connection.release();
    }
  };
  

  const loginUser = (req, res) => {
    const { correo, password } = req.body;

    console.log("Correo recibido:", correo); // Log de correo
    console.log("Password recibido:", password); // Log de contraseña

    db.query('SELECT * FROM usuario WHERE us_correo = ?', [correo], async (error, results) => {
        if (error) {
            console.error("Error al buscar usuario:", error); // Log del error
            return res.status(500).json({ error: "Error al buscar usuario" });
        }
        if (results.length === 0) {
            console.log("No se encontraron usuarios con este correo"); // Mensaje adicional
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.us_contrasena);
        if (!isPasswordValid) {
            console.log("Contraseña no válida"); // Mensaje adicional
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const token = jwt.sign({ id: user.id, role: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Inicio de sesión exitoso", token });
    });
};
 
  

module.exports = { registerUser, loginUser };
