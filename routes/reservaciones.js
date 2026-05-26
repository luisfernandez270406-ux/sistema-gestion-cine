const express = require('express');
const router = express.Router();
const ReservacionesController = require('../controllers/reservaciones.controller');

//ruta para listar las reservaciones
router.get('/', ReservacionesController.listar);
//ruta para crear una nueva reservacion
router.post('/', ReservacionesController.crear);
//ruta para editar una reservacion
router.put('/editar/:id', ReservacionesController.editar);
//ruta para eliminar una reservacion
router.delete('/eliminar/:id', ReservacionesController.eliminar);
//ruta para mostrar el formulario de nueva reservacion
router.get('/nueva', ReservacionesController.mostrarFormulario);

module.exports = router;