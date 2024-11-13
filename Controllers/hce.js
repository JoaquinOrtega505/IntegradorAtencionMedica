
const db = require('../Controllers/coneccionBD');


exports.verHistoriaClinica = async (req, res) => {
    const { id_paciente } = req.params; // Asegúrate de pasar el ID del paciente en la URL
    try {
        // Consulta para obtener la historia clínica
        const query = `
            SELECT 
                am.fecha_atencion,
                m.nombre AS medico_nombre,
                m.apellido AS medico_apellido,
                am.evoluciones,
                am.diagnosticos,
                am.alergias_nombre,
                am.alergias_importancia,
                am.alergias_fecha_desde,
                am.alergias_fecha_hasta,
                am.antecedentes,
                am.antecedentes_fecha_desde,
                am.antecedentes_fecha_hasta,
                am.habitos,
                am.habitos_fecha_desde,
                am.habitos_fecha_hasta,
                am.medicamentos
            FROM atenciones_medicas am
            JOIN medicos m ON am.id_medico = m.id_medico
            WHERE am.id_paciente = ?
            ORDER BY am.fecha_atencion DESC;
        `;

        const [historiaClinica] = await db.query(query, [id_paciente]);

        // Renderizar la vista con los datos obtenidos
        res.render('hce', { historiaClinica });
    } catch (error) {
        console.error("Error al obtener la historia clínica:", error);
        res.status(500).send("Error al obtener la historia clínica");
    }
};






