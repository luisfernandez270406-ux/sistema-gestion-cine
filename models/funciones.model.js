import pool from '../database/db.js'; 

class FuncionesModel {
    static async listar() {
        try {
            const [filas] = await pool.query('SELECT * FROM funciones');
            return filas;
        } catch (error) {
            console.error('Error al listar funciones:', error);
            throw error;
        }
    }

    static async crear(datos) {
        try {
            const { id_pelicula, id_sala, horario, precio } = datos; 
            
            const [resultado] = await pool.query(
                'INSERT INTO funciones (id_pelicula, id_sala, horario, precio) VALUES (?, ?, ?, ?)', 
                [id_pelicula, id_sala, horario, precio]
            );
            return resultado;
        } catch (error) {
            console.error('Error al crear función:', error);
            throw error;
        }
    }


    static async listarDetallado() {

    const [funciones] = await pool.query(`

        SELECT

            f.id,

            p.titulo,

            s.nombre AS sala,

            f.horario,

            f.precio

        FROM funciones f

        INNER JOIN peliculas p
            ON f.id_pelicula = p.id

        INNER JOIN salas s
            ON f.id_sala = s.id

        ORDER BY f.horario

    `);

    return funciones;

}

  
    static async editar(id, datos) {
        const { id_pelicula, id_sala, horario, precio } = datos;
        const [resultado] = await pool.query(
            'UPDATE funciones SET id_pelicula = ?, id_sala = ?, horario = ?, precio = ? WHERE id = ?',
            [id_pelicula, id_sala, horario, precio, id]
        );
        return resultado;
    }

   static async eliminar(id) {
    const [resultado] = await pool.query(
        "DELETE FROM funciones WHERE id = ?",
        [id]
    );

    return resultado;
}

    static async obtenerPorId(id) {

    const [filas] = await pool.query(

        `SELECT * FROM funciones WHERE id = ?`,

        [id]

    );

    return filas[0];

}
static async tieneReservaciones(id) {
    const [filas] = await pool.query(
        "SELECT id FROM reservaciones WHERE id_funcion = ? LIMIT 1",
        [id]
    );

    return filas.length > 0;
}



}

export default FuncionesModel;