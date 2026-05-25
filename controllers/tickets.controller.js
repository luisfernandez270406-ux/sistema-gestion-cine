const TicketsModel = require('../models/tickets.model');

class TicketsController {
    async listar(req,res) {
        try {
            const tickets = await TicketsModel.listar();
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(tickets);
            }
            res.render('tickets', { tickets });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async crear(req,res) {
        try {
            const nuevoTicket = await TicketsModel.crear(req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevoTicket);
            }
            res.redirect('/tickets');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async editar(req,res) {
        try {
            const ticketActualizado = await TicketsModel.editar(req.params.id, req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(ticketActualizado);
            }
            res.redirect('/tickets');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async eliminar(req,res) {
        try {  
            const resultado = await TicketsModel.eliminar(req.params.id);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(resultado);
            }
            res.redirect('/tickets');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async obtenerDetalles(req,res) {
        try {
            const ticket = await TicketsModel.obtenerDetalles(req.params.id);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(ticket);
            }
            res.render('ticket-detalles', { ticket });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
        }
}

module.exports = new TicketsController();