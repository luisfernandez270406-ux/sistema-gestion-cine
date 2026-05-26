const ReservacionesModel = require('../models/reservaciones.model');

class ReservacionesController {
    async listar(req,res) {
        try {
            // await = perate un momentico
            const reservaciones = await ReservacionesModel.listarDetallado();
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(reservaciones);
            } 
            res.render('reservaciones', { reservaciones });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async crear(req,res) {
        try {
            const nuevaReservacion = await ReservacionesModel.crear(req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevaReservacion);
            } 
            res.redirect('/reservaciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async editar(req,res) {
        try {
            const reservacionActualizada = await ReservacionesModel.editar(req.params.id, req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(reservacionActualizada);
            }
            res.redirect('/reservaciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async eliminar(req,res) {
        try {
            const resultado = await ReservacionesModel.eliminar(req.params.id);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(resultado);
            }
            res.redirect('/reservaciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    mostrarFormulario(req,res) {
        res.render('nueva-reservacion');
    }
}

module.exports = new ReservacionesController();