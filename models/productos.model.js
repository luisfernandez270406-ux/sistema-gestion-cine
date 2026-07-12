import pool from '../database/db.js';
 
class ProductosModel {
 
    static async listar() {
        try {
            const [filas] = await pool.query('SELECT * FROM productos');
            return filas;
        } catch (error) {
            console.error('Error al listar productos:', error);
            throw error;
        }
    }
 
    static async crear(datos) {
        try {
            const { nombre, descripcion, precio, stock, activo } = datos;
            const [resultado] = await pool.query(
                'INSERT INTO productos (nombre, descripcion, precio, stock, activo) VALUES (?, ?, ?, ?, ?)',
                [
                    nombre,
                    descripcion,
                    precio,
                    stock ?? 0,
                    activo === undefined ? true : activo
                ]
            );
            return resultado;
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    }
 
    static async obtenerPorId(id) {
        try {
            const [filas] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
            return filas[0];
        } catch (error) {
            console.error('Error al obtener producto:', error);
            throw error;
        }
    }
 
    static async editar(id, datos) {
        try {
            const { nombre, descripcion, precio, stock, activo } = datos;
            const [resultado] = await pool.query(
                'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, activo = ? WHERE id = ?',
                [nombre, descripcion, precio, stock, activo, id]
            );
            return resultado;
        } catch (error) {
            console.error('Error al editar producto:', error);
            throw error;
        }
    }
 
    static async eliminar(id) {
        try {
            const [resultado] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
            return resultado;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
}
 
export default ProductosModel;