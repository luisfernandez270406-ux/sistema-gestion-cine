import express from 'express';
const router = express.Router();
import VentasController from '../controllers/ventas.controller.js';
import { verificarToken } from '../middleware/auth.js';
import { verificarRol } from '../middleware/role.js';
 
// El cliente NO puede ver ni registrar ventas (según la matriz de roles).
 
router.get('/', verificarToken, verificarRol('admin', 'empleado'), VentasController.listar);
router.get('/nuevo', verificarToken, verificarRol('admin', 'empleado'), VentasController.mostrarFormulario);
router.get('/editar/:id', verificarToken, verificarRol('admin', 'empleado'), VentasController.obtenerPorId);
 
router.post('/', verificarToken, verificarRol('admin', 'empleado'), VentasController.crear);
router.put('/editar/:id', verificarToken, verificarRol('admin', 'empleado'), VentasController.editar);
router.delete('/eliminar/:id', verificarToken, verificarRol('admin', 'empleado'), VentasController.eliminar);
 
export default router;