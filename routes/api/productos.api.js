import express from 'express';
const router = express.Router();
import ProductosController from '../../controllers/productos.controller.js';
import { verificarToken } from '../../middleware/auth.js';
import { verificarRol } from '../../middleware/role.js';
 
router.get('/', verificarToken, verificarRol('admin', 'empleado'), ProductosController.listarApi);
router.post('/', verificarToken, verificarRol('admin', 'empleado'), ProductosController.crearApi);
router.get('/:id', verificarToken, verificarRol('admin', 'empleado'), ProductosController.obtenerPorIdApi);
router.put('/:id', verificarToken, verificarRol('admin', 'empleado'), ProductosController.editarApi);
router.delete('/:id', verificarToken, verificarRol('admin', 'empleado'), ProductosController.eliminarApi);
 
export default router;