import express from 'express';
const router = express.Router();
import SalasController from '../controllers/salas.controller.js';
import { verificarToken } from '../middleware/auth.js';
import { verificarRol } from '../middleware/role.js';

// ruta para listar la salas
router.get('/', SalasController.listar);
// ruta para crear salas
router.post('/', verificarToken, verificarRol("admin"),SalasController.crear);
// ruta para editar salas 
router.put('/editar/:id', verificarToken, verificarRol("admin","empleado"),SalasController.editar);
// ruta para eliminar salas
router.delete('/eliminar/:id', verificarToken, verificarRol("admin"),SalasController.eliminar);
export default router;