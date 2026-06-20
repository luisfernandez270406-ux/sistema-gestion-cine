const mysql = require('mysql2/promise'); 
const pool = mysql.createPool({
    host: 'localhost',       
    user: 'root',            
    password: '',            
    database: 'sistema_cine' 
});

pool.getConnection()
    .then(connection => {
        console.log('Conexion sql funcinal');
        connection.release();
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = pool;