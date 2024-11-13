const express = require('express');
const router = express.Router();
const db = require('../Controllers/coneccionBD');
const { agregarAlergia } = require('../Models/atencionMedica');
const { obtenerAlergias } = require('../Models/atencionMedica');
const { guardarAtencion } = require('../Controllers/atencionMedica');

router.get('/atencionMedica', (req, res) => {
    res.render('atencionMedica'); 
});

router.post('/guardarAtencion', guardarAtencion);

// Ruta para mostrar la página de atención médica
router.get('/atencionMedica/:id_agenda', async (req, res) => {
    const id_agenda = req.params.id_agenda;
    const id_medico = req.session.id_medico

    try {
        // Consulta para obtener el nombre, apellido y el id_paciente del paciente a partir de la agenda
        const query = `
            SELECT p.nombre, p.apellido, a.id_paciente
            FROM agenda a
            JOIN pacientes p ON a.id_paciente = p.id_paciente
            WHERE a.id_agenda = ?;
        `;
        const [results] = await db.query(query, [id_agenda]);

        if (results.length > 0) {
            const { nombre, apellido, id_paciente } = results[0];
            // Renderiza la vista y envía los datos del paciente
            const alergias = await obtenerAlergias();

            res.render('atencionMedica', {
                nombre,
                apellido,
                id_paciente,
                id_agenda,
                id_medico,
                alergias
              });
        }   else {
            res.status(404).send("Paciente no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener los datos del paciente:", error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post('/agregarAlergia', async (req, res) => {
    const { alergia } = req.body;
    console.log('Alergia recibida:', alergia); // Verifica que se recibe el valor

    // Verifica si el nombre no está vacío
    if (!alergia || alergia.trim() === "") {
        return res.status(400).send('El nombre de la alergia no puede estar vacío');
    }

    try {
        // Llamada a la función para agregar la alergia
        await agregarAlergia(alergia);
        res.sendStatus(200); // Responder OK
    } catch (error) {
        console.error('Error al agregar alergia:', error);
        res.status(500).send('Error al agregar la alergia');
    }
});

/*router.post('/guardarAtencion', async (req, res) => {
    const { id_agenda, id_paciente, evoluciones, diagnosticos, nombreAlergia, alergias_importancia, 
        fecha_inicio, fecha_fin, antecedentes, habitos, medicamentos } = req.body;

    try {
        // Verificación de campos obligatorios
        if (!id_agenda || !id_paciente) {
            return res.status(400).send("Datos obligatorios faltantes");
        }

        // Obtener id_medico de la tabla agenda
        const queryMedico = `
            SELECT id_medico
            FROM agenda
            WHERE id_agenda = ?;
        `;
        const [medicoResults] = await db.query(queryMedico, [id_agenda]);

        if (medicoResults.length > 0) {
            const id_medico = medicoResults[0].id_medico;

            // Si id_medico se obtiene correctamente, insertamos la atención médica
            const insertQuery = `
                INSERT INTO atenciones_medicas (
                    id_agenda, id_paciente, id_medico, evoluciones, diagnosticos, 
                    alergias_nombre, alergias_importancia, alergias_fecha_desde, 
                    alergias_fecha_hasta, antecedentes, antecedentes_fecha_desde, 
                    antecedentes_fecha_hasta, habitos, habitos_fecha_desde, 
                    habitos_fecha_hasta, medicamentos, fecha_atencion
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());
            `;

            await db.query(insertQuery, [
                id_agenda, id_paciente, id_medico, evoluciones, diagnosticos, 
                nombreAlergia, alergias_importancia, fecha_inicio, fecha_fin, 
                antecedentes, fecha_inicio, fecha_fin, habitos, fecha_inicio, 
                fecha_fin, medicamentos
            ]);

            const updateEstadoQuery = `
                UPDATE agenda
                SET estado = 'atendido'
                WHERE id_agenda = ?;
            `;

            await db.query(updateEstadoQuery, [id_agenda]);

            res.status(200).send("Atención médica guardada exitosamente");
        } else {
            res.status(404).send("Agenda no encontrada");
        }

    } catch (error) {
        console.error("Error al guardar la atención médica:", error);
        res.status(500).send("Error al guardar la atención médica");
    }
});*/



module.exports = router;