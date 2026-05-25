const FuncionesModel = require('../models/funciones.model');

class FuncionesController {
    async listar(req,res) {
        try {
            const funciones = await FuncionesModel.listar();
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(funciones);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

}
    async crear(req,res) {
        try {
            const nuevaFuncion = await FuncionesModel.crear(req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevaFuncion);
            }
            res.redirect('/funciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async editar(req,res) {
        try {
            const funcionActualizada = await FuncionesModel.editar(req.params.id, req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(funcionActualizada);
            }
            res.redirect('/funciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async eliminar(req,res) {
        try {
            const funcionEliminada = await FuncionesModel.eliminar(req.params.id);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json({ message: 'Función eliminada correctamente' });
            }
            res.redirect('/funciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


}

module.exports = new FuncionesController();