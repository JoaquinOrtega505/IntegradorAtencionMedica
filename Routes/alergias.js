//- atencionMedica.js o routes/alergias.js
const express = require("express");
const router = express.Router();
const db = require("../Controllers/coneccionBD");

// Ruta para mostrar la página de alergias
router.get("/alergias", (req, res) => {
  res.render("alergias"); // Renderiza la página alergias.pug
});

// Ruta para guardar una nueva alergia

// Ruta para guardar una nueva alergia
router.post("/guardarAlergia", async (req, res) => {
  const { nombreAlergia } = req.body;

  if (!nombreAlergia || nombreAlergia.trim() === "") {
    return res
      .status(400)
      .send({ error: "El nombre de la alergia no puede estar vacío" });
  }

  try {
    // Verificar si la alergia ya existe en la base de datos
    const [result] = await db.query("SELECT * FROM alergias WHERE nombre = ?", [
      nombreAlergia,
    ]);

    if (result.length > 0) {
      return res.status(400).send({ error: "Esta alergia ya está registrada" });
    }

    // Si no está duplicada, insertamos la nueva alergia
    await db.query("INSERT INTO alergias (nombre) VALUES (?)", [nombreAlergia]);

    // Responder indicando que la alergia se guardó correctamente
    res.status(200).send("Alergia guardada exitosamente");
  } catch (error) {
    console.error("Error al guardar alergia:", error);
    res.status(500).send({ error: "Error al agregar la alergia" });
  }
});

router.get("/api/alergias", async (req, res) => {
  try {
    const [alergias] = await db.query("SELECT * FROM alergias");
    // Asegúrate de que alergias sea un array antes de enviarlo
    if (Array.isArray(alergias)) {
      res.json(alergias);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error al obtener las alergias:", error);
    res.status(500).send("Error en el servidor");
  }
});

/*router.get("/api/alergias", async (req, res) => {
  try {
    const query = "SELECT id, nombre FROM alergias";
    const [results] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener la lista de alergias:", error);
    res.status(500).json({ error: "Error al obtener la lista de alergias" });
  }
});
*/

module.exports = router;
