
const mysql = require('mysql2/promise'); //promise para async/await


const connectionConfig = {
    //port: 3306,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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