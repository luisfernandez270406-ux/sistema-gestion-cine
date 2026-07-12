import express from 'express';
const router = express.Router();
import VentasController from '../../controllers/ventas.controller.js';
import { verificarToken } from '../../middleware/auth.js';
import { verificarRol } from '../../middleware/role.js';

router.get('/', verificarToken, verificarRol('admin', 'empleado'), VentasController.listarApi);
router.post('/', verificarToken, verificarRol('admin', 'empleado'), VentasController.crearApi);
router.get('/:id', verificarToken, verificarRol('admin', 'empleado'), VentasController.obtenerPorIdApi);
router.put('/:id', verificarToken, verificarRol('admin', 'empleado'), VentasController.editarApi);
router.delete('/:id', verificarToken, verificarRol('admin', 'empleado'), VentasController.eliminarApi);

export default router;