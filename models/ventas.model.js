import pool from '../database/db.js';

class VentasModel {

    static async listarDetallado() {
        try {
            const [ventas] = await pool.query(`
                SELECT
                    v.id,
                    v.cantidad,
                    v.total,
                    v.fecha,
                    p.nombre AS producto,
                    u.nombre AS usuario
                FROM ventas v
                INNER JOIN productos p ON v.id_producto = p.id
                INNER JOIN usuarios u ON v.id_usuario = u.id
                ORDER BY v.fecha DESC
            `);
            return ventas;
        } catch (error) {
            console.error('Error al listar ventas:', error);
            throw error;
        }
    }

    // Usa una transacción: si algo falla a la mitad (producto no existe,
    // no hay stock suficiente), NADA se guarda -> no queda la venta
    // registrada sin haber descontado el stock, ni viceversa.
    static async crear(datos) {
        const { id_producto, id_usuario, cantidad } = datos;
        const cantidadNum = Number(cantidad);

        if (!cantidadNum || cantidadNum <= 0) {
            throw new Error('La cantidad debe ser mayor a cero');
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // FOR UPDATE bloquea esa fila mientras dura la transacción,
            // para evitar que dos ventas simultáneas descuenten el mismo
            // stock al mismo tiempo (condición de carrera).
            const [productos] = await connection.query(
                'SELECT precio, stock FROM productos WHERE id = ? FOR UPDATE',
                [id_producto]
            );

            if (productos.length === 0) {
                throw new Error('El producto no existe');
            }

            const producto = productos[0];

            if (producto.stock < cantidadNum) {
                throw new Error(`Stock insuficiente. Disponible: ${producto.stock}`);
            }

            const total = producto.precio * cantidadNum;

            const [resultado] = await connection.query(
                'INSERT INTO ventas (id_producto, id_usuario, cantidad, total) VALUES (?, ?, ?, ?)',
                [id_producto, id_usuario, cantidadNum, total]
            );

            await connection.query(
                'UPDATE productos SET stock = stock - ? WHERE id = ?',
                [cantidadNum, id_producto]
            );

            await connection.commit();

            return { id: resultado.insertId, id_producto, id_usuario, cantidad: cantidadNum, total };

        } catch (error) {
            await connection.rollback();
            console.error('Error al crear venta:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async obtenerPorId(id) {
        try {
            const [filas] = await pool.query(`
                SELECT
                    v.id,
                    v.id_producto,
                    v.id_usuario,
                    v.cantidad,
                    v.total,
                    v.fecha,
                    p.nombre AS producto,
                    u.nombre AS usuario
                FROM ventas v
                INNER JOIN productos p ON v.id_producto = p.id
                INNER JOIN usuarios u ON v.id_usuario = u.id
                WHERE v.id = ?
            `, [id]);
            return filas[0];
        } catch (error) {
            console.error('Error al obtener venta:', error);
            throw error;
        }
    }

    // Nota: esta edición NO recalcula total ni ajusta el stock.
    // Solo permite corregir datos puntuales (ej. si te equivocaste
    // de cliente). Si necesitas que cambiar la cantidad también
    // reajuste el stock, dímelo y lo hacemos con otra transacción.
    static async editar(id, datos) {
        try {
            const { id_producto, id_usuario, cantidad } = datos;
            const [resultado] = await pool.query(
                'UPDATE ventas SET id_producto = ?, id_usuario = ?, cantidad = ? WHERE id = ?',
                [id_producto, id_usuario, cantidad, id]
            );
            return resultado;
        } catch (error) {
            console.error('Error al editar venta:', error);
            throw error;
        }
    }

    static async eliminar(id) {
        try {
            const [resultado] = await pool.query('DELETE FROM ventas WHERE id = ?', [id]);
            return resultado;
        } catch (error) {
            console.error('Error al eliminar venta:', error);
            throw error;
        }
    }
}

export default VentasModel;