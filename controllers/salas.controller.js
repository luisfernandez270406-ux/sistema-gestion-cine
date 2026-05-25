const SalasModel = require('../models/salas.model');

class SalasController {
    listar(req,res) {
        const salas = SalasModel.listar();

        if(req.accepts('json') && !req.accepts('html')) {
            return res.json(salas);
        }
        res.render('salas', { salas });
    }

    crear(req,res) {
        SalasModel.crear(req.body)
        .then(nuevaSala => {
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevaSala);
            }
            res.redirect('/salas');
        })
        .catch(error => {
            res.status(400).send({ error });
        });
    }
    editar(req,res) {
        SalasModel.editar(req.params.id, req.body)
        .then(salaActualizada => {
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(salaActualizada);
            }
            res.redirect('/salas');
        })
        .catch(error => {
            res.status(400).send({ error });
        });
    }
    eliminar(req,res) {
        SalasModel.eliminar(req.params.id)
        .then(() => {
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json({ message: 'Sala eliminada correctamente' });
            }
            res.redirect('/salas');
        })
        .catch(error => {
            res.status(400).send({ error });
        });
    }
}

module.exports = new SalasController();