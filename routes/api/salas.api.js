import express from 'express';
const router = express.Router();
import SalasController from '../../controllers/salas.controller.js';

// ruta para listar la salas
router.get('/', SalasController.listar);
// ruta para crear salas
router.post('/', SalasController.crear);
// ruta para editar salas 
router.put('/editar/:id', SalasController.editar);
// ruta para eliminar salas
router.delete('/eliminar/:id', SalasController.eliminar);
export default router;