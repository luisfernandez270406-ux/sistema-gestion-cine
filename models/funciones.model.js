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
  
    static async editar(id, datos) {
        const { id_pelicula, id_sala, horario, precio } = datos;
        const [resultado] = await pool.query(
            'UPDATE funciones SET id_pelicula = ?, id_sala = ?, horario = ?, precio = ? WHERE id = ?',
            [id_pelicula, id_sala, horario, precio, id]
        );
        return resultado;
    }

    static async eliminar(id) {
        const [resultado] = await pool.query('DELETE FROM funciones WHERE id = ?', [id]);
        return resultado;
    }
}

export default FuncionesModel;