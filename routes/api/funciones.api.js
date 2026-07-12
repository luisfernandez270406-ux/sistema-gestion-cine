import express from 'express';
const router = express.Router();
import FuncionesController from '../../controllers/funciones.controller.js';
import { verificarToken } from '../../middleware/auth.js';
import { verificarRol } from '../../middleware/role.js';

// ruta para listar las funciones
router.get('/', FuncionesController.listarApi);
// ruta para crear funciones
router.post('/', verificarToken, verificarRol("admin"),FuncionesController.crearApi);
//ruta para editar funciones
router.put('/editar/:id', verificarToken, verificarRol("admin","empleado"),FuncionesController.editarApi);
// ruta para eliminar funciones
router.delete('/eliminar/:id',verificarToken, verificarRol("admin"), FuncionesController.eliminarApi);

export default router;