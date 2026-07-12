import express from 'express';
const router = express.Router();
import ReservacionesController from '../../controllers/reservaciones.controller.js';
import { verificarToken } from '../../middleware/auth.js';
import { verificarRol } from '../../middleware/role.js';

//ruta para listar las reservaciones
router.get('/', verificarToken, verificarRol("admin","empleado","cliente"),ReservacionesController.listarApi);
//ruta para crear una nueva reservacion
router.post('/', verificarToken, verificarRol("admin","empleado","cliente"),ReservacionesController.crearApi);
//ruta para editar una reservacion
router.put('/editar/:id', verificarToken, verificarRol("admin","empleado","cliente"),ReservacionesController.editarApi);
//ruta para eliminar una reservacion
router.delete('/eliminar/:id', verificarToken, verificarRol("admin"),ReservacionesController.eliminarApi);
//ruta para mostrar el formulario de nueva reservacion
router.get('/nueva', ReservacionesController.mostrarFormulario);
//ruta para obtener una reservacion por su ID (para mostrar el formulario de edición)
router.get('/editar/:id', ReservacionesController.obtenerPorIdApi);

export default router;