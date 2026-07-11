import { v4 as uuidv4 } from 'uuid';
import pool from '../database/db.js'; 

class ReservacionesModel {
  
    static async listarDetallado() {
    const [reservaciones] = await pool.query(`
        SELECT
            r.id,
            r.nombre_cliente,
            r.cantidad_asientos,

            p.titulo,

            s.nombre AS sala,

            f.horario,
            f.precio

        FROM reservaciones r

        INNER JOIN funciones f
            ON r.id_funcion = f.id

        INNER JOIN peliculas p
            ON f.id_pelicula = p.id

        INNER JOIN salas s
            ON f.id_sala = s.id
    `);

    return reservaciones;
}
static async crear(datos) {
    const id = uuidv4();

    const { nombre_cliente, cantidad_asientos, id_funcion } = datos;

    const [result] = await pool.query(
        `INSERT INTO reservaciones (id, nombre_cliente, cantidad_asientos, id_funcion)
         VALUES (?, ?, ?, ?)`,
        [id, nombre_cliente, cantidad_asientos, id_funcion]
    );

    return result;
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
    static async obtenerPorId(id) {
    const [rows] = await pool.query(`
        SELECT 
            r.id,
            r.nombre_cliente,
            r.cantidad_asientos,
            r.id_funcion,

            p.titulo,
            s.nombre AS sala,
            f.horario,
            f.precio

        FROM reservaciones r
        INNER JOIN funciones f ON r.id_funcion = f.id
        INNER JOIN peliculas p ON f.id_pelicula = p.id
        INNER JOIN salas s ON f.id_sala = s.id
        WHERE r.id = ?
    `, [id]);

    return rows[0];
}
static async tieneTickets(id) {
    const [rows] = await pool.query(
        'SELECT COUNT(*) as total FROM tickets WHERE id_reservacion = ?',
        [id]
    );

    return rows[0].total > 0;
}

}

export default ReservacionesModel;