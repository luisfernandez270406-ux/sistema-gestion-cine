import pool from '../database/db.js';

class ReservacionesModel {
    static async listarDetallado(idUsuario = null) {
        let query = `
            SELECT
                r.id,
                r.nombre_cliente,
                r.cantidad_asientos,
                r.id_usuario,

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
        `;

        const params = [];

        if (idUsuario) {
            query += ' WHERE r.id_usuario = ?';
            params.push(idUsuario);
        }

        const [reservaciones] = await pool.query(query, params);
        return reservaciones;
    }

    static async crear(datos) {

        const { cantidad_asientos, id_funcion, id_usuario } = datos;

        if (!id_usuario) {
            throw new Error('Debes seleccionar un cliente');
        }

        // El nombre_cliente ya NO se toma de un texto libre: se saca
        // del usuario real seleccionado, para que siempre coincida
        // con el id_usuario guardado (y así el cliente sí ve sus
        // propias reservaciones en el listado filtrado).
        const [filasUsuario] = await pool.query(
            'SELECT nombre FROM usuarios WHERE id = ?',
            [id_usuario]
        );

        if (filasUsuario.length === 0) {
            throw new Error('El cliente seleccionado no existe');
        }

        const nombreCliente = filasUsuario[0].nombre;

        const [result] = await pool.query(
            `INSERT INTO reservaciones (nombre_cliente, cantidad_asientos, id_funcion, id_usuario)
             VALUES (?, ?, ?, ?)`,
            [nombreCliente, cantidad_asientos, id_funcion, id_usuario]
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
                r.id_usuario,

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