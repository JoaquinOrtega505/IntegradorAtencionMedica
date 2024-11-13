const db = require('../Controllers/coneccionBD');

const agendaDelDia = async (req, res) => {
    const fecha = req.query.fecha || new Date().toISOString().slice(0, 10); // Por defecto, fecha de hoy
    const query = `
        SELECT agenda.hora,pacientes.id_paciente, pacientes.nombre, pacientes.apellido, agenda.motivo_consulta, agenda.estado, agenda.id_agenda
        FROM agenda
        JOIN pacientes ON agenda.id_paciente = pacientes.id_paciente
        WHERE agenda.fecha = ?
        AND agenda.id_medico = ?`;

    try {
        const [rows] = await db.query(query, [fecha, req.session.medicoId])
        console.log("Citas obtenidas:", rows);;
        res.render('agenda', { citas: rows, todayDate: fecha });
    } catch (error) {
        //console.error("Error al obtener la agenda del día:", error);
        res.status(500).send("Error al obtener la Agenda");
    }
};

module.exports = { agendaDelDia };
