const express = require('express');
const router = express.Router();
const db = require('../Controllers/coneccionBD');
const { agendaDelDia } = require('../Controllers/agenda');
const { logout, isAuthenticated } = require('../Controllers/autenticacion');



function checkAuth(req, res, next) {
    if (req.session && req.session.medicoId) { // Verifica si medicoId está en la sesión
        next(); // El usuario está autenticado, continúa
    } else {
        res.redirect('/login'); // No está autenticado, redirige al login
    }
}

router.get('/agenda', checkAuth, agendaDelDia);

router.post('/logout', logout)

router.post('/cancelarTurno/:id_agenda', async (req, res) => {
  const { id_agenda } = req.params;
  
  try {
      // Actualizar el estado de la cita a 'cancelado'
      const query = 'UPDATE agenda SET estado = ? WHERE id_agenda = ?';
      await db.query(query, ['cancelado', id_agenda]);
      
      // Redirigir de nuevo a la agenda después de actualizar el estado
      res.redirect('/agenda');
  } catch (error) {
      console.error("Error al cancelar el turno:", error);
      res.status(500).send("Error al cancelar el turno");
  }
});



/*router.post("/cancelar-turno/:id_agenda", async (req, res) => {
  const { id_agenda } = req.params; // Captura el id de la cita desde los parámetros de la URL
  console.log("ID de la cita a cancelar:", id_agenda); // Este debe imprimir el ID correcto

  const query = "UPDATE agenda SET estado = ? WHERE id_agenda = ?";

  const estadoNuevo = "cancelado"; // Asegúrate de que el estado sea uno de los valores del ENUM
  //await db.query(query, [estadoNuevo, id_agenda]);

  try {
    const [result] = await db.query(query, [id_agenda]); // Usa id_agenda directamente
    console.log("Resultado de la actualización:", result);

    if (result.affectedRows === 0) {
      console.error(
        "No se encontró ninguna fila para actualizar con el ID proporcionado."
      );
    }

    res.redirect("/agenda"); // Recargar la agenda después de actualizar
  } catch (err) {
    console.error("Error al cancelar el turno:", err);
    res.status(500).send("Error al cancelar el turno");
  }
});*/






module.exports = router;
