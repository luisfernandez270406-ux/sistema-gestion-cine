const express = require('express');
const router = express.Router();
const FuncionesController = require('../controllers/funciones.controller');

// ruta para listar las funciones
router.get('/', FuncionesController.listar);
// ruta para crear funciones
router.post('/', FuncionesController.crear);
//ruta para editar funciones
router.put('/editar/:id', FuncionesController.editar);
// ruta para eliminar funciones
router.delete('/eliminar/:id', FuncionesController.eliminar);

module.exports = router;