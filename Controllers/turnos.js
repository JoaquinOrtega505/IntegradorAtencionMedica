const db = require('../Controllers/coneccionBD');



obtenerEspecialidades = async (req, res) => {
    try {
        // Consulta para obtener todas las especialidades
        const [especialidades] = await db.query('SELECT id_especialidad, nombre_especialidad FROM especialidades');

        // Renderizar la vista 'cargarTurno' y enviar las especialidades como variable
        res.render('turnos', { especialidades });
    } catch (error) {
        console.error('Error al obtener las especialidades:', error.message);
        res.status(500).send('Error al cargar especialidades');
    }
};

obtenerMedicosPorEspecialidad = async (req, res) => {
    const { id_especialidad } = req.params;
    console.log('ID Especialidad recibido:', id_especialidad);
    

    try {
        const [especialidadExiste] = await db.query(
            'SELECT * FROM especialidades WHERE id_especialidad = ?',
            [id_especialidad]
        );
        console.log('Especialidad existe:', especialidadExiste);
        // Consulta para obtener los médicos con la especialidad seleccionada
        const [medicos] = await db.query(
            `SELECT DISTINCT m.id_medico, m.nombre, m.apellido 
            FROM medicos AS m
            JOIN medicos_especialidades AS me ON m.id_medico = me.id_medico
            JOIN especialidades AS e ON me.id_especialidad = e.id_especialidad
            WHERE e.id_especialidad = ?`, 
            [id_especialidad]
        );
        console.log('Medicos:', medicos);

        // Verificar si se encontraron médicos
        if (medicos.length === 0) {
            return res.status(404).json({ success: false, message: 'No se encontraron médicos para esta especialidad' });
        }

        // Devolver los médicos en formato JSON
        res.json(medicos);
    } catch (error) {
        console.error('Error al obtener los médicos:', error.message);
        res.status(500).send('Error al cargar médicos');
    }
};

module.exports = {
    obtenerEspecialidades, obtenerMedicosPorEspecialidad
};