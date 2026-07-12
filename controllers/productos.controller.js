import ProductosModel from '../models/productos.model.js';

class ProductosController {

    // ===== Web: renderiza vista =====
    async listar(req, res) {
        try {
            const productos = await ProductosModel.listar();
            if (req.accepts('json') && !req.accepts('html')) {
                return res.json(productos);
            }
            res.render('productos', { productos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== API: JSON puro =====
    async listarApi(req, res) {
        try {
            const productos = await ProductosModel.listar();
            return res.json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    mostrarFormulario(req, res) {
        res.render('nuevo-producto');
    }

    async crear(req, res) {
        try {
            const datosProducto = {
                ...req.body,
                activo: req.body.activo === 'false' ? false : true
            };
            const nuevoProducto = await ProductosModel.crear(datosProducto);
            if (req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevoProducto);
            }
            res.redirect('/productos');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async crearApi(req, res) {
        try {
            const datosProducto = {
                ...req.body,
                activo: req.body.activo === false || req.body.activo === 'false' ? false : true
            };
            const nuevoProducto = await ProductosModel.crear(datosProducto);
            return res.status(201).json(nuevoProducto);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const producto = await ProductosModel.obtenerPorId(req.params.id);
            if (!producto) {
                return res.status(404).send('Producto no encontrado');
            }
            if (req.accepts('json') && !req.accepts('html')) {
                return res.json(producto);
            }
            res.render('editar-producto', { producto });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async obtenerPorIdApi(req, res) {
        try {
            const producto = await ProductosModel.obtenerPorId(req.params.id);
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            return res.json(producto);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async editar(req, res) {
        try {
            const datosProducto = {
                ...req.body,
                activo: req.body.activo === 'false' ? false : true
            };
            const productoActualizado = await ProductosModel.editar(req.params.id, datosProducto);
            if (req.accepts('json') && !req.accepts('html')) {
                return res.json(productoActualizado);
            }
            res.redirect('/productos');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async editarApi(req, res) {
        try {
            const datosProducto = {
                ...req.body,
                activo: req.body.activo === false || req.body.activo === 'false' ? false : true
            };
            const productoActualizado = await ProductosModel.editar(req.params.id, datosProducto);
            return res.json(productoActualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async eliminar(req, res) {
        try {
            await ProductosModel.eliminar(req.params.id);
            if (req.accepts('json') && !req.accepts('html')) {
                return res.json({ message: 'Producto eliminado correctamente' });
            }
            res.redirect('/productos');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async eliminarApi(req, res) {
        try {
            await ProductosModel.eliminar(req.params.id);
            return res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new ProductosController();