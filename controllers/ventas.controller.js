import VentasModel from '../models/ventas.model.js';
import ProductosModel from '../models/productos.model.js';
import UsuariosModel from '../models/usuarios.model.js';

class VentasController {

    async listar(req, res) {
        try {
            const ventas = await VentasModel.listarDetallado();
            if (req.accepts('json') && !req.accepts('html')) {
                return res.json(ventas);
            }
            res.render('ventas', { ventas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async listarApi(req, res) {
        try {
            const ventas = await VentasModel.listarDetallado();
            return res.json(ventas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // El formulario necesita la lista de productos (con su stock/precio)
    // y la lista de clientes para llenar los dos <select>.
    async mostrarFormulario(req, res) {
        try {
            const productos = await ProductosModel.listar();
            const usuarios = await UsuariosModel.listar();
            const clientes = usuarios.filter(u => u.rol === 'cliente');
            res.render('nueva-venta', { productos, clientes, error: req.query.error });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async crear(req, res) {
        try {
            const nuevaVenta = await VentasModel.crear(req.body);
            if (req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevaVenta);
            }
            res.redirect('/ventas');
        } catch (error) {
            if (req.accepts('json') && !req.accepts('html')) {
                return res.status(400).json({ error: error.message });
            }
            // Regresa al formulario con el mensaje de error legible,
            // en vez de mostrarle JSON crudo al navegador.
            res.redirect(`/ventas/nuevo?error=${encodeURIComponent(error.message)}`);
        }
    }

    async crearApi(req, res) {
        try {
            const nuevaVenta = await VentasModel.crear(req.body);
            return res.status(201).json(nuevaVenta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const venta = await VentasModel.obtenerPorId(req.params.id);
            if (!venta) {
                return res.status(404).send('Venta no encontrada');
            }
            if (req.accepts('json') && !req.accepts('html')) {
                return res.json(venta);
            }
            const productos = await ProductosModel.listar();
            const usuarios = await UsuariosModel.listar();
            const clientes = usuarios.filter(u => u.rol === 'cliente');
            res.render('editar-venta', { venta, productos, clientes });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async obtenerPorIdApi(req, res) {
        try {
            const venta = await VentasModel.obtenerPorId(req.params.id);
            if (!venta) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            return res.json(venta);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async editar(req, res) {
        try {
            const ventaActualizada = await VentasModel.editar(req.params.id, req.body);
            if (req.accepts('json') && !req.accepts('html')) {
                return res.json(ventaActualizada);
            }
            res.redirect('/ventas');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async editarApi(req, res) {
        try {
            const ventaActualizada = await VentasModel.editar(req.params.id, req.body);
            return res.json(ventaActualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async eliminar(req, res) {
        try {
            await VentasModel.eliminar(req.params.id);
            if (req.accepts('json') && !req.accepts('html')) {
                return res.json({ message: 'Venta eliminada correctamente' });
            }
            res.redirect('/ventas');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async eliminarApi(req, res) {
        try {
            await VentasModel.eliminar(req.params.id);
            return res.json({ message: 'Venta eliminada correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new VentasController();