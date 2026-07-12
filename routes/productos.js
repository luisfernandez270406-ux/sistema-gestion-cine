import express from 'express';
const router = express.Router();
import ProductosController from '../controllers/productos.controller.js';
import { verificarToken } from '../middleware/auth.js';
import { verificarRol } from '../middleware/role.js';
 
// Nota: el cliente NO puede ver productos en absoluto (según la matriz de roles),
// por eso hasta el listar lleva verificarRol('admin','empleado').
 
router.get('/', verificarToken, verificarRol('admin', 'empleado'), ProductosController.listar);
router.get('/nuevo', verificarToken, verificarRol('admin', 'empleado'), ProductosController.mostrarFormulario);
router.get('/editar/:id', verificarToken, verificarRol('admin', 'empleado'), ProductosController.obtenerPorId);
 
router.post('/', verificarToken, verificarRol('admin', 'empleado'), ProductosController.crear);
router.put('/editar/:id', verificarToken, verificarRol('admin', 'empleado'), ProductosController.editar);
router.delete('/eliminar/:id', verificarToken, verificarRol('admin', 'empleado'), ProductosController.eliminar);
 
export default router;
 