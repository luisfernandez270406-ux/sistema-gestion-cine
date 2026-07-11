import mysql from 'mysql2/promise'; 
const pool = mysql.createPool({
    host: 'localhost',       
    user: 'root',            
    password: '',            
    database: 'sistema_cine' 
});
try{ 
    const connection = await pool.getConnection();
    console.log('Conexion sql funcional');
    connection.release();
} catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    };

export default pool;