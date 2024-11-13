const express = require("express");
const router = express.Router();
const db = require("../Controllers/coneccionBD");
const { obtenerEspecialidades, obtenerMedicosPorEspecialidad  } = require('../Controllers/turnos');


router.get('/turnos', obtenerEspecialidades, obtenerMedicosPorEspecialidad);

router.get('/medicos/:id_especialidad', obtenerMedicosPorEspecialidad);

module.exports = router;