import { v4 as uuidv4 } from 'uuid';
import pool from '../database/db.js'; 

class TicketsModel {

    static async listar() {
        const [tickets] = await pool.query('SELECT * FROM tickets');
        return tickets;
    }

    static async crear(datos) {
        const { id_reservacion, metodo_pago } = datos;
        // Eliminado codigo_ticket
        const [resultado] = await pool.query(
            'INSERT INTO tickets (id_reservacion, fecha_emision, metodo_pago) VALUES (?, NOW(), ?)',
            [id_reservacion, metodo_pago]
        );
        return { id: resultado.insertId, ...datos };
    }

    static async editar(id, datos) {
        const { id_reservacion, metodo_pago } = datos;
        // Eliminado codigo_ticket
        const [resultado] = await pool.query(
            'UPDATE tickets SET id_reservacion = ?, metodo_pago = ? WHERE id = ?',
            [id_reservacion, metodo_pago, id]
        );
        return { id, ...datos };
    }

    static async eliminar(id) {
        const [resultado] = await pool.query('DELETE FROM tickets WHERE id = ?', [id]);
        return { id, ...resultado };
    }

    static async obtenerDetalles(id) {
        const query = `
            SELECT t.*, r.nombre_cliente, p.titulo AS pelicula, s.nombre AS sala, f.horario, f.precio
            FROM tickets t
            JOIN reservaciones r ON t.id_reservacion = r.id
            JOIN funciones f ON r.id_funcion = f.id
            JOIN peliculas p ON f.id_pelicula = p.id
            JOIN salas s ON f.id_sala = s.id
            WHERE t.id = ?
        `;
        const [resultado] = await pool.query(query, [id]);
        return resultado[0];
    }

    static async obtenerUltimosElementos() {
        const [tickets] = await pool.query('SELECT * FROM tickets ORDER BY fecha_emision DESC LIMIT 5');
        return tickets;
    }

    static async filtrarPorFecha(inicio, fin) {
    const query = `
        SELECT * FROM tickets 
        WHERE DATE(fecha_emision) >= ? AND DATE(fecha_emision) <= ?
    `;
    const [tickets] = await pool.query(query, [inicio, fin]);
    return tickets;
}
}

export default TicketsModel;