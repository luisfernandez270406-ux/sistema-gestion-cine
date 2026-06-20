const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');

class ReservacionesModel {
  
    static async listarDetallado() {
        const [reservaciones] = await pool.query('SELECT * FROM reservaciones');
        return reservaciones;
    }
  
    static async crear(datos) {
        const { id_funcion, nombre_cliente, cantidad_asientos } = datos;
        const id = uuidv4(); 
        const [resultado] = await pool.query(
            'INSERT INTO reservaciones (id, id_funcion, nombre_cliente, cantidad_asientos) VALUES (?, ?, ?, ?)',
            [id, id_funcion, nombre_cliente, cantidad_asientos]
        );
        return { id, ...resultado };
    }

    static async editar(id, datos) {
        const { id_funcion, nombre_cliente, cantidad_asientos } = datos;
        const [resultado] = await pool.query(
            'UPDATE reservaciones SET id_funcion = ?, nombre_cliente = ?, cantidad_asientos = ? WHERE id = ?',
            [id_funcion, nombre_cliente, cantidad_asientos, id]
        );
        return resultado;
    }

  
    static async eliminar(id) {
        const [resultado] = await pool.query('DELETE FROM reservaciones WHERE id = ?', [id]);
        return resultado;
    }
}

module.exports = ReservacionesModel;