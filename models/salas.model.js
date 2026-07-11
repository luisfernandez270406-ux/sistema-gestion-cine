import { v4 as uuidv4 } from 'uuid';
import pool from '../database/db.js'; 

class SalasModel {
    static async listar() {
        try {
            const [filas] = await pool.query('SELECT * FROM salas');
            return filas;
        } catch (error) {
            console.error('Error al listar salas:', error);
            throw error;
        }
    }

    static async crear(datosSala) {
        try {
            const id = uuidv4();
            const { nombre, capacidad, tipo } = datosSala;
            
            const [resultado] = await pool.query(
                'INSERT INTO salas (id, nombre, capacidad, tipo) VALUES (?, ?, ?, ?)', 
                [id, nombre, capacidad, tipo]
            );
            return resultado;
        } catch (error) {
            console.error('Error al crear sala:', error);
            throw error;
        }
    }
    static async editar(id, datosSala) {
        try {
            const { nombre, capacidad, tipo } = datosSala;
            const [resultado] = await pool.query(
                'UPDATE salas SET nombre = ?, capacidad = ?, tipo = ? WHERE id = ?',
                [nombre, capacidad, tipo, id]
            );
            return resultado.affectedRows > 0;
        } catch (error) {
            console.error(`Error al editar sala ${id}:`, error);
            throw error;
        }
    }

    static async eliminar(id) {
        try {
            const [resultado] = await pool.query('DELETE FROM salas WHERE id = ?', [id]);
            return resultado.affectedRows > 0;
        } catch (error) {
            console.error(`Error al eliminar sala ${id}:`, error);
            throw error;
        }
    }
}




export default SalasModel;