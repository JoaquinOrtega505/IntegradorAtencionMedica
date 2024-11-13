const express = require('express');
const router = express.Router();
const db = require('../Controllers/coneccionBD'); // Asegúrate de que la ruta sea correcta

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login'); // Renderiza la vista del formulario de inicio de sesión
});



// Ruta para manejar el inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Aquí usamos el número 0 como contraseña para todos los usuarios
    const query = 'SELECT * FROM medicos WHERE username = ? AND password = ?';
    const values = [username, password];

    try {
        const [results] = await db.query(query, values);
        if (results.length > 0) {
            // Usuario encontrado, iniciar sesión
            req.session.medicoId = results[0].id_medico; // Guardar el ID del médico en la sesión
            return res.redirect('/agenda'); // Redirigir a la vista de agenda
        } else {
            // Usuario no encontrado
            res.send('Usuario o contraseña incorrectos');
        }
    } catch (err) {
        return res.status(500).send('Error en la base de datos');
    }
});

module.exports = router;

