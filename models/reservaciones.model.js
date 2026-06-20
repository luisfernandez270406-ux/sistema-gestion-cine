const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');

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