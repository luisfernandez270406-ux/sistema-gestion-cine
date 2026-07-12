import pool from '../database/db.js';
import bcrypt from "bcrypt";
 
class UsuariosModel {
    static async listar() {
        try {
            const [filas] = await pool.query('SELECT id, nombre, usuario, correo, rol FROM usuarios');
            return filas;
        } catch (error) {
            console.error('Error al listar usuarios:', error);
            throw error;
        }
    }
 
    static async crear(datosUsuario) {
        try {
            const { nombre, usuario, password, correo, rol } = datosUsuario;
            const passwordHash = await bcrypt.hash(password, 10);
            const rolFinal = rol || 'cliente';
            const [resultado] = await pool.query(
                'INSERT INTO usuarios (nombre, usuario, password, correo, rol) VALUES (?, ?, ?, ?, ?)',
                [nombre, usuario, passwordHash, correo, rolFinal]
            );
            return { id: resultado.insertId, nombre, usuario, correo, rol: rolFinal };
        }
        catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }
    static async obtenerPorId(id) {
        try {
            const [filas] = await pool.query(
                'SELECT id, nombre, usuario, correo, rol, creado_en FROM usuarios WHERE id = ?',
                [id]
            );
            if (filas.length === 0) {
                return null;
            }
            return filas[0];
        } catch (error) {
            console.error(`Error al obtener usuario con ID ${id}:`, error);
            throw error;
        }
    }
    static async obtenerPorUsuario(usuario) {
        try {
            const [filas] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
            if (filas.length === 0) {
                return null;
            }
            return filas[0];
        } catch (error) {
            console.error(`Error al obtener usuario con nombre de usuario ${usuario}:`, error);
            throw error;
        }
    }
    static async eliminar(id) {
        try {
            const [resultado] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
            return resultado.affectedRows > 0;
        } catch (error) {
            console.error(`Error al eliminar usuario con ID ${id}:`, error);
            throw error;
        }
    }
 
}
 
export default UsuariosModel;