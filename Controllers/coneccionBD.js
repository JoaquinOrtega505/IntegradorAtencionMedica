
const mysql = require('mysql2/promise'); //promise para async/await


const connectionConfig = {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tp_integrador_lab2'
};

// Crear la conexión a la base de datos
const db = mysql.createPool(connectionConfig);

async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('Conexión a la base de datos exitosa');
        connection.release(); // Libera la conexión
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

// Llamar a la función para probar la conexión
testConnection();

module.exports = db;