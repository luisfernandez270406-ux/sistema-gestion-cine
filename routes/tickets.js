const express = require('express');
const router = express.Router();
const TicketsController = require('../controllers/tickets.controller');

//ruta para listar los tickets
router.get('/', TicketsController.listar);
//ruta para crear un nuevo ticket
router.post('/', TicketsController.crear);
//ruta para editar un ticket
router.put('/editar/:id', TicketsController.editar);
//ruta para eliminar un ticket
router.delete('/eliminar/:id', TicketsController.eliminar);
//ruta para obtener detalles de un ticket
router.get('/detalles/:id', TicketsController.obtenerDetalles);



module.exports = router;