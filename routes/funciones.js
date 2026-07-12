import express from 'express';
const router = express.Router();
import FuncionesController from '../controllers/funciones.controller.js';
import { verificarToken } from '../middleware/auth.js';
import { verificarRol } from '../middleware/role.js';

// ruta para listar las funciones
router.get('/', FuncionesController.listar);
// ruta para crear funciones
router.post('/', verificarToken, verificarRol("admin"),FuncionesController.crear);
//ruta para editar funciones
router.put('/editar/:id', verificarToken, verificarRol("admin","empleado"),FuncionesController.editar);
// ruta para eliminar funciones
router.delete('/eliminar/:id', verificarToken, verificarRol("admin"),FuncionesController.eliminar);

export default router;