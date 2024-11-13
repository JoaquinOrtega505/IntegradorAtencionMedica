const db = require('../Controllers/coneccionBD');
const { obtenerAlergias } = require('../Models/atencionMedica');

const renderizarAtencionMedica = async (req, res) => {
    try {
        const alergias = await obtenerAlergias();
        res.render('atencionMedica', { alergias });
    } catch (error) {
        console.error('Error al obtener las alergias:', error);
        res.status(500).send('Error al cargar la página de atención médica');
    }
};

exports.guardarAtencion = async (req, res) => {
    const { id_agenda, id_paciente, evoluciones, diagnosticos, nombreAlergia, alergias_importancia, 
        fecha_inicio, fecha_fin, antecedentes, habitos, medicamentos } = req.body;
        
    
    try {
        if (!id_agenda || !id_paciente) {
           //return res.status(400).send("Datos obligatorios faltantes");
           return res.status(400).json({ success: false, message: "Datos obligatorios faltantes" });
        }

        const queryMedico = `SELECT id_medico FROM agenda WHERE id_agenda = ?;`;
        const [medicoResults] = await db.query(queryMedico, [id_agenda]);

        if (medicoResults.length > 0) {
            const id_medico = medicoResults[0].id_medico;

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

            const updateEstadoQuery = `UPDATE agenda SET estado = 'atendido' WHERE id_agenda = ?;`;
            await db.query(updateEstadoQuery, [id_agenda]);

            return res.status(200).send("<script>alert('Atención médica guardada exitosamente');window.location.href = '/agenda';</script>");
            //return res.status(200).send( alert= "Atención médica guardada exitosamente");
            console.log("Atención médica guardada exitosamente para id_paciente:", id_paciente);
            //res.status(200)json({ success: true, message: "Atención médica guardada exitosamente" });
        } else {
            return res.status(404).send("Agenda no encontrada");
        }
    } catch (error) {
        //console.error("Error al guardar la atención médica:", error);
        console.error("Error al guardar la atención médica:", error.message);
        return res.status(500).send("Error al guardar la atención médica");
    }
};



