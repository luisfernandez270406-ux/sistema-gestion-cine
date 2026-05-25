const express = require('express');
const router = express.Router();
const SalasController = require('../controllers/salas.controller');

// ruta para listar la salas
router.get('/', SalasController.listar);
// ruta para crear salas
router.post('/', SalasController.crear);
// ruta para editar salas 
router.put('/editar/:id', SalasController.editar);
// ruta para eliminar salas
router.delete('/eliminar/:id', SalasController.eliminar);
module.exports = router;