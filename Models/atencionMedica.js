const db = require('../Controllers/coneccionBD');

const obtenerAlergias = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM alergias');
        return rows;
    } catch (error) {
        console.error('Error al obtener alergias:', error);
        throw error;
    }
};

const agregarAlergia = async (nombre) => {
    try {
        const [result] = await db.query('INSERT INTO alergias (nombre) VALUES (?)', [nombre]);
        return result.insertId;
    } catch (error) {
        console.error('Error al agregar alergia:', error);
        throw error;
    }
};
module.exports = { obtenerAlergias, agregarAlergia };